const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

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
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt )
    
        await user.save();
        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Authentication problems, talk with the site admin'
        })
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log('wrong')
            return res.status(400).json({
                ok: false,
                msg: 'User with that email does not exist'
            })
        }

        // Validar constraseñas
        const validPassword = await bcrypt.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Passowrd does not match'
            })
        }
        
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Authentication problems, talk with the site admin'
        })
    }

}

const revalidateToken = async(req, res) => {
    const uid = req.uid
    const name = req.name

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}
