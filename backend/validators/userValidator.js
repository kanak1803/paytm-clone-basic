const { z } = require("zod");

const registerUserSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 3 character long"),
  lastName: z.string().min(3, "Last Name must be at least 3 character long"),
  username: z.string().min(3, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 character long"),
});

module.exports = { registerUserSchema };
