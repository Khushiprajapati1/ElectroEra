const { z } = require("zod");

//creating object schema for Login (Validations for Login)
const loginSchema = z.object({

  email: z
    .string({ required_error: "Email Id is required" })
    .trim()
    .min(3, { message: "Email Id must be atleast 3 characters" })
    .max(50, { message: "Email Id must not be more than 50 characters" }),
    
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 7 characters" })
    .max(255, { message: "Password must not be more than 255 characters" }),
});

//creating object schema for signUp (Validations for signup)
const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters" })
    .max(255, { message: "Username must not be more than 255 characters" }),

  

  phone: z
    .string({ required_error: "Phone Number is required" })
    .trim()
    .length(10, { message: "Phone Number must be of 10 digits" }),
});

module.exports = { signUpSchema, loginSchema };
