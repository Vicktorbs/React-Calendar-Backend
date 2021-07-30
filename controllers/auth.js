const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The eamil is already used'
            })
        }
        
        user = new User(req.body);
    
        await user.save()
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Authentication problems, talk with the site admin'
        })
    }
}

const loginUser = (req, res) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidateToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew',
        email,
        password
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}