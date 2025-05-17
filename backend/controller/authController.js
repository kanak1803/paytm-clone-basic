const {
  registerUserSchema,
  loginUserSchema,
} = require("../validators/userValidator");
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

const userLogin = async (req, res) => {
  const zodValidation = loginUserSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }
  const { username, password } = zodValidation.data;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const userId = user._id;
    const token = generateJWtToken(userId);
    res
      .status(200)
      .json({ message: "Login succesfully", user: user, jwtToken: token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {userRegister,userLogin};
