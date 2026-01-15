const express = require("express"); 
const app = express(); const PORT = 3000;

// Middleware to parse JSON app.use(express.json());

// In-memory data store (temporary) let events = []; let eventIdCounter = 1;

/**

Create a new event
POST /events
Body: { "title": "Hackathon", "date": "2026-03-10", "location": "Campus Hall" } */ app.post("/events", (req, res) => { const { title, date, location } = req.body;
if (!title || !date || !location) { return res.status(400).json({ error: "All fields are required" }); }

const event = { id: eventIdCounter++, title, date, location, attendees: [] };

events.push(event); res.status(201).json(event); });

/**

Get all events
GET /events */ app.get("/events", (req, res) => { res.json(events); });
/**

Register an attendee for an event
POST /events/:id/register
Body: { "name": "Alex Johnson", "email": "alex@example.com" } */ app.post("/events/:id/register", (req, res) => { const eventId = Number(req.params.id); const { name, email } = req.body;
const event = events.find(e => e.id === eventId);

if (!event) { return res.status(404).json({ error: "Event not found" }); }

if (!name || !email) { return res.status(400).json({ error: "Name and email are required" }); }

event.attendees.push({ name, email }); res.json({ message: "Registration successful" }); });

/**

Get attendees for an event
GET /events/:id/attendees */ app.get("/events/:id/attendees", (req, res) => { const eventId = Number(req.params.id); const event = events.find(e => e.id === eventId);
if (!event) { return res.status(404).json({ error: "Event not found" }); }

res.json(event.attendees); });

// Start server 
app.listen(PORT, () => { console.log(`Event planner backend running on http://localhost:${PORT}`); });