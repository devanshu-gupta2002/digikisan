import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
})

// userSchema.plugin(mongooseUniqueValidator)
const User = mongoose.model("User", userSchema)

export default User