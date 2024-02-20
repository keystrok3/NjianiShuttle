const User = require("../models/user");

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


module.exports = { register };