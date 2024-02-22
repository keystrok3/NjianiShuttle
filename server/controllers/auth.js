
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

/**
 * Add new user to database
*/
const register = async (req, res, next) => {

    const { national_id, first_name, last_name, email, password } = req.body;

    try {
        const new_user = await User.create({
            national_id: national_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });

        res.status(201).json({ success: true, new_user });
    } catch (error) {
        console.error(`Error Registering new user: ${error}`)
        res.status(500).json({ success: false, message: "Not registered. Server error " });
    }
};



/**
 * Login 
 * 
 * */ 
const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user_by_id = await User.findOne({ where: { email: email }}); 
        if(user_by_id === null) {
            return res.status(404).json({ success: false, message: "Wrong Credentials" });
        }

        const check_password = await bcrypt.compare(password, user_by_id.password)

        if(!check_password) {
            return res.status(403).json({ success: false, message: "Unauthorised" });
        }

        const token = jwt.sign({ userId: user_by_id.email }, process.env.JWT_SECRET, { expiresIn: '3d' });

        return res.status(201).json({ success: true, token: token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Couldn't log in. Server error." });
    }
}


module.exports = { register, login };