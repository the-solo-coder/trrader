let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

//create user model instance
let User = require("../models/user");


module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
    return res.status(404).send("User doesn't exists!");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
    return res.status(400).send("Invalid password!");

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "jwtSecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
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