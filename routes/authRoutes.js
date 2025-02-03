const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();


//Register User
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //cek user apakah sudah ada
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({msg: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({msg: "User successfully registered", user: newUser});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({msg: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: "User & password does not match"});
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({msg: "Authenticated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;