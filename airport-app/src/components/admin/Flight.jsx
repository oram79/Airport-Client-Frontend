import React, { useState, useEffect } from 'react';
import api from '../../api';

const Flight = () => {
  const [flights, setFlights] = useState([]);
  const [gates, setGates] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    flightSeat: '',
    flightOrigin: '',
    flightDestination: '',
    flightAirline: '',
    gate: {
      gateId: null
    },
    aircraft: {
      aircraftId: null
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [flightsData, gatesData, aircraftData] = await Promise.all([
          api.flights.getAllFlights(),
          api.gates.getAllGates(),
          api.aircraft.getAllAircraft()
        ]);
        setFlights(flightsData);
        setGates(gatesData);
        setAircraft(aircraftData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const data = await api.flights.getAllFlights();
      setFlights(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load flights. Please try again later.');
      setLoading(false);
      console.error('Error fetching flights:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGateSelect = (e) => {
    const gateId = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      gate: {
        gateId: gateId
      }
    });
  };

  const handleAircraftSelect = (e) => {
    const aircraftId = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      aircraft: {
        aircraftId: aircraftId
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.flights.createFlight(formData);
      setFormData({
        flightSeat: '',
        flightOrigin: '',
        flightDestination: '',
        flightAirline: '',
        gate: {
          gateId: null
        },
        aircraft: {
          aircraftId: null
        }
      });
      setShowForm(false);
      fetchFlights(); // Refresh flight list
    } catch (err) {
      setError('Failed to add flight. Please try again.');
      console.error('Error adding flight:', err);
    }
  };

  const handleDelete = async (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await api.flights.deleteFlight(flightId);
        fetchFlights(); // Refresh flight list
      } catch (err) {
        setError('Failed to delete flight. Please try again.');
        console.error('Error deleting flight:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading flights...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flight-container">
      <div className="flight-header">
        <h2>Flight Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Flight'}
        </button>
      </div>

      {showForm && (
        <form className="flight-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="flightSeat">Seat Information</label>
            <input
              type="text"
              id="flightSeat"
              name="flightSeat"
              className="form-control"
              value={formData.flightSeat}
              onChange={handleInputChange}
              required
              placeholder="e.g. Economy, Business, First"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="flightOrigin">Origin Airport Code</label>
            <input
              type="text"
              id="flightOrigin"
              name="flightOrigin"
              className="form-control"
              value={formData.flightOrigin}
              onChange={handleInputChange}
              required
              placeholder="e.g. YYZ"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="flightDestination">Destination Airport Code</label>
            <input
              type="text"
              id="flightDestination"
              name="flightDestination"
              className="form-control"
              value={formData.flightDestination}
              onChange={handleInputChange}
              required
              placeholder="e.g. YVR"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="flightAirline">Airline</label>
            <input
              type="text"
              id="flightAirline"
              name="flightAirline"
              className="form-control"
              value={formData.flightAirline}
              onChange={handleInputChange}
              required
              placeholder="e.g. Air Canada"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gate">Gate</label>
            <select
              id="gate"
              name="gate"
              className="form-control"
              onChange={handleGateSelect}
              required
            >
              <option value="">Select Gate</option>
              {gates.map(gate => (
                <option key={gate.gateId} value={gate.gateId}>
                  Terminal {gate.terminal}, Gate {gate.number}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="aircraft">Aircraft</label>
            <select
              id="aircraft"
              name="aircraft"
              className="form-control"
              onChange={handleAircraftSelect}
              required
            >
              <option value="">Select Aircraft</option>
              {aircraft.map(aircraft => (
                <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
                  {aircraft.type || aircraft.model} - {aircraft.airlineName}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-success">
            Add Flight
          </button>
        </form>
      )}

      <h3>Flight List</h3>
      {flights.length === 0 ? (
        <p>No flights found. Add a new flight to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Airline</th>
              <th>Seat</th>
              <th>Gate</th>
              <th>Aircraft</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightId}>
                <td>{flight.flightId}</td>
                <td>{flight.flightOrigin}</td>
                <td>{flight.flightDestination}</td>
                <td>{flight.flightAirline}</td>
                <td>{flight.flightSeat}</td>
                <td>
                  {flight.gate 
                    ? `Terminal ${flight.gate.terminal}, Gate ${flight.gate.number}` 
                    : 'Not assigned'}
                </td>
                <td>
                  {flight.aircraft 
                    ? `${flight.aircraft.type || flight.aircraft.model}` 
                    : 'Not assigned'}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(flight.flightId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Flight;