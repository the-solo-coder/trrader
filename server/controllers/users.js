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
      return res.status(StatusCodes.BAD_REQUEST).send('User already exists! Try new email address.')
    }

    if (password !== confirmPassword)
    return res.status(StatusCodes.BAD_REQUEST).send("Password doesn't match")
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.')
  }
}

module.exports.updateProfile = async (req, res) => {
  const profileId = req.query.id
  let hashedPassword = ''

  const payload = [{	"propName": "email", "value": req.body.email},
  {	"propName": "name", "value": req.body.name}, 
  {	"propName": "password", "value": req.body.password}, 
  {	"propName": "profilePicture", "value": req.body.profilePicture}]

  // sanitizing date with fields with no empty string
  const updateData = {}
  for (const data of payload) {
    if (data.value) {
      if (data.propName === 'password') {
        hashedPassword = await bcrypt.hash(data.value, 12)
        updateData[data.propName] = hashedPassword
      } else {
        updateData[data.propName] = data.value
      }
    }
  }
  console.log('Data received to be updated: ', updateData)

  //checking if the email given by user already exists in the database
  const emailAlreadyExists = await User.findOne({
    email: updateData.email,
    _id: { $ne: profileId }
  })

  if (emailAlreadyExists) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: 'Email already exists, please choose another one.' })
  }
  //useFindAndModify
  User.findOneAndUpdate({ _id: profileId }, { $set: updateData })
    .exec()
    .then(result => {
      //creating a token
      const token = jwt.sign(
        { email: updateData.email, id: profileId },
        'jwtSecret',
        { expiresIn: '12h' }
      )
      //sending response
      res
        .status(StatusCodes.OK)
        .json({ message: 'Updated with success', profileId, token })
    })
    .catch(err => {
      console.log('Error in update user profile: ', err)
      //returning server error
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('Something went wrong, try later!')
    })
}

module.exports.getProfileById = async (req, res) => {
  const profileId = req.query.id

  let profile
  try {
    profile = await User.findById(profileId, '-password')
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

  const result = profile.toObject({ getters: true })
  res.locals.profile = result
  res.status(StatusCodes.OK).json(result)
}

module.exports.deleteProfileById = async (req, res) => {
  User.findByIdAndDelete(req.query.id).then(profile => {
    if (profile) {
      res.status(StatusCodes.OK).json({ status: 'Profile deleted' })
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: 'Error while deleting' })
    }
  })
}
