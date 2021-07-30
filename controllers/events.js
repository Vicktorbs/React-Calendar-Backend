const Event = require('../models/Event')

const getEvents = async(req, res) => {
    const events = await Event.find().populate('user', 'name');

    res.status(201).json({
        ok: true,
        events
    })
}

const createEvent = async(req, res) => {
    const event = new Event(req.body)

    try {
        event.user = req.uid;
        const eventSaved = await event.save();
        res.status(201).json({
            ok: true,
            event: eventSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'EVent: creation error'
        })
    }
}

const updateEvents = async(req, res) => {
    const eventID = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventID);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event with that ID does not exist"
            })
        }

        if (event.user.toString() !== uid) {
            // console.log(event.user, uid)
            return res.status(401).json({
                ok: false,
                msg: "Not enought permissions"
            })
        }

        const newEvent = { ...req.body, user: uid }
        const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Unable to update the evenet"
        })
    }
}

const deleteEvents = async(req, res) => {
    const eventID = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventID);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event with that ID does not exist"
            })
        }
        
        if (event.user.toString() !== uid) {
            // console.log(event.user, uid)
            return res.status(401).json({
                ok: false,
                msg: "Not enought permissions"
            })
        }

        const updatedEvent = await Event.findByIdAndDelete(eventID);

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Unable to update the evenet"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvents,
    deleteEvents
}