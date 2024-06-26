import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const register = async(req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body
    if(password.length<6){
      return res.status(400).json({ error: "Password length must be greater than 6"})
    }
    if(username.length<3){
      return res.status(400).json({ error: "Username length must be greater than 3"})
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!emailPattern.test(email)) {
      res.status(400).json({ error: "Invalid Email"})
      return;
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)

  } catch (error) {
      res.status(500).json({ error: error });
  }
}

export const login = async(req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if(!user) return res.status(400).json({msg: "User does not exist"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({msg: "Invalid credentials"})

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({token, user})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}