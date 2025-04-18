import React, { useEffect, useState } from 'react';
import api from '../../api';

const ArrivalBoard = ({ airportCode }) => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArrivals = async () => {
      if (!airportCode) return;
      
      try {
        setLoading(true);
        // Updated to use the correct endpoint
        const data = await api.airports.getAirportArrivals(airportCode);
        
        const enhancedData = data.map(flight => ({
          ...flight,
          status: getRandomStatus(),
          scheduledTime: getRandomTime(),
          actualTime: getRandomTime(),
          terminal: getRandomTerminal(),
        }));
        
        setArrivals(enhancedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load arrival data. Please try again later.');
        setLoading(false);
        console.error('Error fetching arrivals:', err);
      }
    };

    fetchArrivals();
  }, [airportCode]);

  // Helper functions to generate random flight data for demo
  const getRandomStatus = () => {
    const statuses = ['On Time', 'Delayed', 'Landed', 'In Air'];
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
      case 'Landed': return 'status-landed';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Time': return '✓';
      case 'Delayed': return '⏱';
      case 'Landed': return '✈️';
      case 'In Air': return '🛫';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="board-container">
        <div className="board-header">
          <h2>Arrivals</h2>
        </div>
        <div className="loading">
          <p>Loading arrival information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-container">
        <div className="board-header">
          <h2>Arrivals</h2>
        </div>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>Arrivals</h2>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
      
      {arrivals.length === 0 ? (
        <p>No arrivals found for this airport.</p>
      ) : (
        <div className="flight-table-container">
          <table className="flight-table">
            <thead>
              <tr>
                <th>Flight</th>
                <th>From</th>
                <th>Airline</th>
                <th>Time</th>
                <th>Status</th>
                <th>Terminal</th>
                <th>Gate</th>
              </tr>
            </thead>
            <tbody>
              {arrivals.map((flight) => (
                <tr key={flight.flightId}>
                  <td>
                    <strong>
                      {flight.flightAirline.substring(0, 2)}
                      {Math.floor(Math.random() * 1000 + 100)}
                    </strong>
                  </td>
                  <td>{flight.flightOrigin}</td>
                  <td>{flight.flightAirline}</td>
                  <td>{flight.scheduledTime}</td>
                  <td className={getStatusClass(flight.status)}>
                    <span className="status-icon">{getStatusIcon(flight.status)}</span>
                    {flight.status}
                  </td>
                  <td>{flight.terminal}</td>
                  <td>{flight.gate?.number || flight.terminal + Math.floor(Math.random() * 20 + 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArrivalBoard;