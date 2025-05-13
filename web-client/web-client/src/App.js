import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const fetchEvents = async () => {
  try {
    const res = await axios.get('http://localhost:5000/events');
    return res.data;
  } catch (error) {
    console.error('Error fetching events', error);
    return [];
  }
};

const addEvent = async (eventData) => {
  try {
    await axios.post('http://localhost:5000/events', eventData);
    alert('Event added successfully');
  } catch (error) {
    console.error('Error adding event', error);
  }
};

const updateEvent = async (id, updatedData) => {
  try {
    await axios.put(`http://localhost:5000/events/${id}`, updatedData);
    alert('Event updated successfully');
  } catch (error) {
    console.error('Error updating event', error);
  }
};

const deleteEvent = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/events/${id}`);
    alert('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event', error);
  }
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [editEventId, setEditEventId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadEvents = async () => {
    const eventsData = await fetchEvents();
    setEvents(eventsData);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editEventId) {
      await updateEvent(editEventId, formData);
      setEditEventId(null);
    } else {
      await addEvent(formData);
    }
    setFormData({ title: '', date: '', time: '', location: '', description: '' });
    loadEvents();
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>📅 Event Planner</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Form */}
      <div className="form-section">
        <h2>{editEventId ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
          <button type="submit">{editEventId ? 'Update' : 'Add'} Event</button>
        </form>
      </div>

      {/* Event List */}
      <div className="event-list">
        <h2>Upcoming Events</h2>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.date} @ {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
                <div className="event-actions">
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event._id)} className="delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
