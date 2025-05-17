const { registerUserSchema } = require("../validators/userValidator");
const User = require("../models/User");

const userRegister = async (req, res) => {
  const validation = registerUserSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const { firstName, lastName, username, password } = validation.data;
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(411).json({ message: "Username already exist" });
    }
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password,
    });
    res.status(500).json({ message: "User created", newUser });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

module.exports = userRegister;
