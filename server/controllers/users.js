let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let StatusCodes = require('http-status-codes')

//create user model instance
let User = require('../models/user')

module.exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(StatusCodes.NOT_FOUND).send("User doesn't exists!")

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(StatusCodes.BAD_REQUEST).send('Invalid password!')
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'jwtSecret',
      { expiresIn: '12h' }
    )
    console.log(`User: ${existingUser} and Token: ${token}`)
    res.status(200).json({ result: existingUser, token })
  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.')
  }
}

module.exports.signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    profilePicture
  } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.log(existingUser)
      return res.status(400).json({ message: 'User already exists.' })
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." })
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      profilePicture
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'jwtSecret',
      { expiresIn: '1h' }
    )
    console.log(`User registered:${result} and Token: ${token}`)
    res.status(200).json({ result, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports.updateProfile = async (req, res) => {
  const id = req.params.id
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    profilePicture
  } = req.body
  console.log(`Id: ${id} and Body: ${req.body}`)
  try {
    const existingUser = await User.findOne({ id })
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists)
      return res
        .status(400)
        .json({ message: 'Email already exists, please choose another one.' })

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." })
    const hashedPassword = await bcrypt.hash(password, 12)

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...existingUser, id },
      { new: true }
    )
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      profilePicture
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'jwtSecret',
      { expiresIn: '1h' }
    )

    res.status(200).json({ result, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

module.exports.getProfileById = async (req, res) => {
  console.log('here')
  const profileId = req.query.id

  let profile
  try {
    profile = await User.findById(profileId)
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Something went wrong, try later!')
  }

  if (!profile) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("Couldn't find profile for the provided id")
  }

  res.json({ profile: profile.toObject({ getters: true }) })
}
