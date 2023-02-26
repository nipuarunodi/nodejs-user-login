const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Register Users
router.post('/register', async (req, res) => {
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            first_name: req.body.first_name,
            last_name:  req.body.last_name,
            mobile_number:  req.body.mobile_number,
            email:  req.body.email,
            password: req.body.password,
            picture: req.body.picture,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});


// Login Users
router.post('/login', async (req, res) => {
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    res.send({
        first_name: user.first_name,
        last_name:  user.last_name,
        mobile_number:  user.mobile_number,
        email:  user.email,
        picture: user.picture,
    });
});

module.exports = router;