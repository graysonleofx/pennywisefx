// Create a React component called LiveEvents
// Use a static array of objects like { name, amount, type, date, time }
// Show one event at a time with a fade-in animation
// After a few seconds, show the next event in loop using setInterval
// Add basic styling to make it look like a live feed
import React, { useState, useEffect } from 'react';
import '../styles/liveEvent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LiveEvents = () => {
  const events = [
    { name: "Michael Recheal", amount: "$11,000", type: "Platinum Plan", date: "2025-07-25", time: "09:12 AM" },
    { name: "Grace Lee", amount: "$3,500", type: "Silver Plan", date: "2025-01-15", time: "09:15 AM" },
    { name: "Kwame Mensah", amount: "$300", type: "Basic Plan", date: "2025-07-05", time: "09:20 AM" },
    { name: "Amina Yusuf", amount: "$5,200", type: "Gold Plan", date: "2025-02-25", time: "09:30 AM" },
    { name: "Liam Carter", amount: "$7,000", type: "Gold Plan", date: "2025-07-25", time: "09:45 AM" },
    { name: "Ngozi Nwosu", amount: "$450", type: "Silver Plan", date: "2025-04-25", time: "10:05 AM" },
    { name: "David Zhang", amount: "$18,000", type: "Platinum Plan", date: "2025-07-25", time: "10:30 AM" },
    { name: "Fatima Bello", amount: "$600", type: "Basic Plan", date: "2025-03-25", time: "10:45 AM" },
    { name: "John Daniels", amount: "$1,950", type: "Gold Plan", date: "2025-01-22", time: "11:00 AM" },
    { name: "Emily Torres", amount: "$8,050", type: "Gold Plan", date: "2025-01-15", time: "11:35 AM" },
    { name: "Samuel Uche", amount: "$1,620", type: "Silver Plan", date: "2025-01-02", time: "11:42 AM" },
    { name: "Ijeoma Kelvin", amount: "$10,200", type: "Platinum Plan", date: "2025-07-25", time: "11:57 AM" },
    { name: "Hassan Salim", amount: "$430", type: "Basic Plan", date: "2025-07-25", time: "12:15 PM" },
    { name: "Vivian Ode", amount: "$9,080", type: "Gold Plan", date: "2025-07-25", time: "12:30 PM" },
    { name: "Carlos Mendez", amount: "$12,050", type: "Platinum Plan", date: "2025-07-25", time: "12:45 PM" },
    { name: "Zainab Jibril", amount: "$7,020", type: "Silver Plan", date: "2025-07-25", time: "01:00 PM" },
    { name: "Victor Essien", amount: "$1,890", type: "Gold Plan", date: "2025-03-05", time: "01:12 PM" },
    { name: "Grace Adebayo", amount: "$350", type: "Basic Plan", date: "2025-07-25", time: "01:25 PM" },
    { name: "Daniel Kim", amount: "$14,400", type: "Platinum Plan", date: "2025-07-25", time: "01:40 PM" },
    { name: "Chinedu Obi", amount: "$10,500", type: "Platinum Plan", date: "2025-07-25", time: "11:20 AM" }
  ];

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Initial delay before showing the first event
    const initialTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setFade(true);
    }, 6000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (currentIndex === -1) return;

    setFade(true);

    const fadeTimeout = setTimeout(() => {
      setFade(false);
    }, 4500); // Start fade-out before switching

    const interval = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
      setFade(true);
    }, 5000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(interval);
    };
  }, [currentIndex, events.length]);

  const handleClose = () => {
    setCurrentIndex(-1);
  };

  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    // add a cancel button to stop the live events
    <div className="live-events-container">
      {currentIndex !== -1 && (
        <>
          <div className="live-event-alert-box bottom-left">
            <h2><strong>Live Investment Alert</strong></h2>
            <div className={`live-event ${fade ? "fade-in" : "fade-out"}`}>
              <span className="close-btn" onClick={handleClose}>×</span>
              <p>New investment made by <strong>{sortedEvents[currentIndex].name}</strong>.</p>
              <p><strong>Amount:</strong> {sortedEvents[currentIndex].amount}</p>
              <p><strong> Type:</strong> {sortedEvents[currentIndex].type}</p>
              <p> <strong>Date:</strong> {sortedEvents[currentIndex].date}</p>
              <p><strong>Time:</strong> {sortedEvents[currentIndex].time}</p>
              {/* <p>Thank you for your investment!</p> */}
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default LiveEvents;
