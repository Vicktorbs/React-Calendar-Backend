const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { validateFields } = require('../Middlewares/validate_fields')

router.post(
    '/new', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password should has six characters').isLength({min: 6}),
        validateFields
    ], 
    createUser)

router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password should has six characters').isLength({min: 6}),
        validateFields
    ], 
    loginUser)

router.get('/renew', validateJWT, revalidateToken)

module.exports = router;