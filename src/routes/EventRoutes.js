const express = require("express");
const eventsRouter = express.Router();
const mongoose = require("mongoose");

const { Event } = require("../models/EventModel");
const { User } = require("../models/UserModel");

const {
  getEvents,
  getEventsUsers,
  getUsersBookings,
  getUsersCompleted,
  getEventById,
  createEvent,
  changeEventById,
  createBooking,
  deleteBooking,
} = require("../controllers/EventController");

// See all events, only admin should have this.
eventsRouter.get("/all", getEvents);

// See only future events
eventsRouter.get("/users", getEventsUsers);

// Get a list of user bookings
eventsRouter.get("/userbookings/:username", getUsersBookings);

// Get a list of user's completed runs'
eventsRouter.get("/usercompleted/:username", getUsersCompleted);

// return the details for a single event
eventsRouter.get("/by-id/:id", getEventById);

// Create a new event, no trainer validation yet.
eventsRouter.post("/", createEvent);

// edit a single event
eventsRouter.put("/change-event/:id", changeEventById);

// add an event to a user's bookings
eventsRouter.put("/bookuser", createBooking);

// for admin/trainer to remove an event
eventsRouter.delete("/:id", deleteBooking);

module.exports = eventsRouter;
