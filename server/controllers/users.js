let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

//create user model instance
let User = require("../models/user");


module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "jwtSecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      profilePicture
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "jwtSecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

//test-Richard
// module.exports.getUserById = (req, res) => {
//   let id = req.params.id;
//   try {
//     User.findById({ _id: id }, (err, user) => {
//       if (err) {
//         console.log("This did not work");
//         res.status(500).json({ message: "Something went wrong." });
//       } else {
//         console.log(user);
//       }
//     })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// }

// module.exports.getUserById = (req, res) => {
//   let id = req.params.id;
//   User.findById({_id: id}, (err, individual) => {
//       if (err) {
//           console.log(err);
//           res.end(err);
//       } else {
//           console.log(individual);
//           res.status(200).send({individual});
//       }
//   })
// }

module.exports.getUserById = (req, res) => {
  let id = req.params.id;
  const loggedInUser = User.findOne({_id: id}, (err, loggedInUser) =>{
    if (!loggedInUser) {
      console.log("This user does not exist.");
    } else {
      console.log(loggedInUser);
      res.status(200).send({ loggedInUser });
    }
  });
  // User.findById({ _id: id }, (err, individual) => {
  //   if (err) {
  //     console.log("Hello");
  //     // res.json({ error: err });
  //   } else {
  //     console.log("Good-bye");
  //     // console.log(individual);
  //     // res.status(200).send({ individual });
  //   }
  // })
}