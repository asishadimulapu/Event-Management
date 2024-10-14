// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Import your controller

// Get all events
router.get('/', eventController.getAllEvents);

// Create a new event
router.post('/', eventController.createEvent);

// Delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;