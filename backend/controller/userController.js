const User = require("../models/User");
const { updateProfileSchema } = require("../validators/userValidator");

const updateProfile = async (req, res) => {
  const zodValidation = updateProfileSchema.safeParse(req.body);

  if (!zodValidation.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: zodValidation.error.errors });
  }
  const updates = zodValidation.data;
  
  console.log(req.userId);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: updates,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Profile update successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update user profile" });
  }
};

module.exports = { updateProfile };
