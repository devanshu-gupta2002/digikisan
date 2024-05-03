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
      response.status(400).json({ error: "Password length must be greater than 6"})
    }
    if(username.length<3){
      response.status(400).json({ error: "Username length must be greater than 3"})
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!emailPattern.test(email)) {
      response.status(400).json({ error: "Invalid Email"})
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

  } catch (err) {
    res.status(500).json({error: err.message})
  }
}