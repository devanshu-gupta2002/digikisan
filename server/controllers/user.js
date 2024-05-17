import User from "../models/user.js";

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {username, email, phone, address} = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {username, email, phone, address},
      {new: true, runValidators: true}
    )

    if(!updateUser) {
      return res.status(404).json({error: "User not found"})
    }

    res.json(updateUser)
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export {
  updateUser
}