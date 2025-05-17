const { registerUserSchema } = require("../validators/userValidator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateJWtToken = require("../utils/jwtTokenGenretor");

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
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
    });
    const userId = newUser._id;
    //generate jwt token
    const token = generateJWtToken(userId);
    res
      .status(201)
      .json({ message: "User created", user: newUser, jwtToken: token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

module.exports = userRegister;
