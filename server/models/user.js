const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Method to generate an authentication token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
};

// Create the User model
const User = mongoose.model("user", userSchema);

// Define the validation schema using Joi
const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity({
            min: 8, // Minimum length
            max: 30, // Maximum length
            lowerCase: 1, // At least 1 lowercase letter
            upperCase: 1, // At least 1 uppercase letter
            numeric: 1, // At least 1 number
            symbol: 1, // At least 1 symbol
            requirementCount: 4, // Must meet at least 4 of the above requirements
        }).required().label("Password"),
    });

    return schema.validate(data);
};

// Export the User model and validate function
module.exports = { User, validate };