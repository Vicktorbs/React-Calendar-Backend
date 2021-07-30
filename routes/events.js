const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvents, deleteEvents } = require('../controllers/events');
const router = express.Router();
const { validateJWT } = require('../Middlewares/validate-jwt');
const { validateFields } = require('../Middlewares/validate_fields');
const { isDate } = require('../helpers/isDate')

// Todos tienen que pasar por la validacion de JWT 
router.use(validateJWT)

router.get('/', getEvents);

router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Date start is required').custom(isDate),
        check('end', 'Date end is required').custom(isDate),
        validateFields
    ],
    createEvent
);

router.put(
    '/:id', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Date start is required').custom(isDate),
        check('end', 'Date end is required').custom(isDate),
        validateFields
    ],
    updateEvents
);

router.delete('/:id', deleteEvents);

module.exports = router;