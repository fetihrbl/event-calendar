import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

const App = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleInputChange = (event) => {
        setEventName(event.target.value);
    };

    const addEvent = () => {
        if (selectedDate && eventName.trim()) {
            const newEvent = {
                id: Date.now(),
                date: selectedDate,
                title: eventName.trim(),
            };
            setEvents([...events, newEvent]);
            setEventName("");
        }
    };

    const startEditing = (event) => {
        setEditingEvent(event.id);
        setUpdatedTitle(event.title);
    };

    const updateEvent = () => {
        if (editingEvent !== null && updatedTitle.trim()) {
            setEvents(events.map(event =>
                event.id === editingEvent ? { ...event, title: updatedTitle.trim() } : event
            ));
            setEditingEvent(null);
        }
    };

    const deleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    return (
        <div className="app">
            <h1>Event Calendar</h1>
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        onClickDay={handleDateClick}
                        tileClassName={({ date }) =>
                            selectedDate && date.toDateString() === selectedDate.toDateString()
                                ? "selected"
                                : events.some(event => event.date.toDateString() === date.toDateString())
                                ? "event-marked"
                                : ""
                        }
                    />
                </div>

                <div className="event-container">
                    {selectedDate && (
                        <div className="event-form">
                            <h2>Create Event</h2>
                            <p>Selected Date: {selectedDate.toDateString()}</p>
                            <input
                                type="text"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={handleInputChange}
                            />
                            <button className="create-btn" onClick={addEvent}>
                                Add Event
                            </button>
                        </div>
                    )}

                    {events.length > 0 && selectedDate && (
                        <div className="event-list">
                            <h2>My Events</h2>
                            <div className="event-cards">
                                {events.map(event =>
                                    event.date.toDateString() === selectedDate.toDateString() ? (
                                        <div key={event.id} className="event-card">
                                            <div className="event-card-header">
                                                <span className="event-date">{event.date.toDateString()}</span>
                                                <div className="event-actions">
                                                    {editingEvent === event.id ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={updatedTitle}
                                                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                                            />
                                                            <button className="save-btn" onClick={updateEvent}>
                                                                Save
                                                            </button>
                                                            <button className="cancel-btn" onClick={() => setEditingEvent(null)}>
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="update-btn" onClick={() => startEditing(event)}>
                                                                Edit
                                                            </button>
                                                            <button className="delete-btn" onClick={() => deleteEvent(event.id)}>
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="event-card-body">
                                                <p className="event-title">{event.title}</p>
                                            </div>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
