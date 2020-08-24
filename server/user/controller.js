import bcrypt from 'bcrypt'
import User from './model'
import JWT from './jwt'
import Email from '../candidate/email'

require('dotenv').config()

export default {
  signup: async (req, res) => {
    const userData = req.body.formValues
    console.log(userData)
    /* Validating Sign up Form */
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({ message: 'All fileds are required' })
    }
    console.log('pass basic check')
    // check for existing user account
    try {
      const foundUser = await User.findOne({ email: userData.email })
      console.log(foundUser)
      if (foundUser) {
        return res
          .status(400)
          .json({
            message: 'Email has already been registered, please try again.'
          })
      }
    } catch {
      return res.status(400).json({ message: 'Bad request, try again' })
    }

    // generate hash Salt
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(userData.password, salt)

    console.log('hash', hash)

    const newUser = { ...userData, password: hash }
    console.log('newUser', newUser)

    const createdUser = await User.create(newUser)

    try {
      const token = await JWT.generateToken(createdUser)
      const { _id, email, type, name } = createdUser
      const userToSend = {
        _id,
        email,
        type,
        name
      }
      await Email.send(email, name, 'noId')
      console.log('userToSend', userToSend)
      res.status(200).json({ token, user: userToSend })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'Somthing went wrong, try again later.' })
    }
  },
  login: async (req, res) => {
    const userData = req.body.formValues
    console.log(userData)
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: 'Please enter your email and password' })
    }
    try {
      const foundUser = await User.findOne({ email: userData.email })
      if (!foundUser) {
        return res.status(400).json({ message: 'Username or password is incorrect' })
      }
      const isMatch = await bcrypt.compare(userData.password, foundUser.password)
      console.log('0', isMatch)
      if (isMatch) {
        console.log('1', isMatch)
        try {
          console.log('in here', foundUser)
          const token = await JWT.generateToken(foundUser)
          console.log('tokennnn', token)
          const { _id, email, type, candidate, company } = foundUser
          const userToSend = {
            _id,
            email,
            type,
            candidate,
            company
          }
          console.log(userToSend)
          return res.status(200).json({ token, user: userToSend })
        } catch {
          return res.status(500).json({ message: 'access forbidden' })
        }
      } else {
        console.log('2', isMatch)
        return res.status(400).json({ message: 'Username or password is incorrect' })
      }
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong. Please try again' })
    }
  },
  profile: async (req, res) => {
    try {
      // console.log(req)

      const { _id, email, type, candidate, company } = req.user
      const userToSend = {
        _id,
        email,
        type,
        candidate,
        company
      }

      res.status(200).json({ message: 'success', user: userToSend })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
    }
  }
}
