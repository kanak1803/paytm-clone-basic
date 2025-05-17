const { z } = require("zod");

const registerUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});

module.exports = { registerUserSchema };
