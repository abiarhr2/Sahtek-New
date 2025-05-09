const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");

// Login route
router.post("/", async (req, res) => {
  try {
    // Step 1: Validate user input
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Step 2: Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    // Step 3: Validate the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    // Step 4: Generate a JWT token
    const token = user.generateAuthToken();

    // Step 5: Send the token to the client
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Input validation schema using Joi
const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = router; // Export router to be used in index.js
