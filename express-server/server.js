// Importing required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors());  // Enabling CORS
app.use(bodyParser.json());  // To parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event-planner')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
});

// Event Model
const Event = mongoose.model('Event', eventSchema);

// Routes
// Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Add new event
app.post('/events', async (req, res) => {
  const { title, date, time, location, description } = req.body;
  try {
    const newEvent = new Event({ title, date, time, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Update event
app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, time, location, description } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { title, date, time, location, description }, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// Delete event
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
