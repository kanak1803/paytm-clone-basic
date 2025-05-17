const { z } = require("zod");

const registerUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});

const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
});

module.exports = { registerUserSchema, loginUserSchema, updateProfileSchema };
