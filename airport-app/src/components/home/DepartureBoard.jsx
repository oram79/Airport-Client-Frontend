import React, { useState, useEffect } from 'react';
import api from '../../api';

const DepartureBoard = ({ airportCode }) => {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      if (!airportCode) return;
      
      try {
        setLoading(true);
        const data = await api.flights.getFlightsByOrigin(airportCode);
        const enhancedData = data.map(flight => ({
          ...flight,
          status: getRandomStatus(),
          scheduledTime: getRandomTime(),
          actualTime: getRandomTime(),
          terminal: getRandomTerminal(),
        }));
        
        setDepartures(enhancedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load departure data. Please try again later.');
        setLoading(false);
        console.error('Error fetching departures:', err);
      }
    };

    fetchDepartures();
  }, [airportCode]);

  const getRandomStatus = () => {
    const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getRandomTerminal = () => {
    const terminals = ['A', 'B', 'C', 'D'];
    return terminals[Math.floor(Math.random() * terminals.length)];
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'Boarding': return 'status-boarding';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="board-container">
        <div className="board-header">
          <h2>Departures</h2>
        </div>
        <p>Loading departure information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-container">
        <div className="board-header">
          <h2>Departures</h2>
        </div>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>Departures</h2>
      </div>
      
      {departures.length === 0 ? (
        <p>No departures found for this airport.</p>
      ) : (
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>To</th>
              <th>Airline</th>
              <th>Scheduled</th>
              <th>Status</th>
              <th>Terminal</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {departures.map((flight) => (
              <tr key={flight.flightId}>
                <td>
                  {flight.flightAirline.substring(0, 2)}
                  {Math.floor(Math.random() * 1000 + 100)}
                </td>
                <td>{flight.flightDestination}</td>
                <td>{flight.flightAirline}</td>
                <td>{flight.scheduledTime}</td>
                <td className={getStatusClass(flight.status)}>
                  {flight.status}
                </td>
                <td>{flight.terminal}</td>
                <td>{flight.gate?.number || flight.terminal + Math.floor(Math.random() * 20 + 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartureBoard;