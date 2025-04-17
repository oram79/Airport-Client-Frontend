import React, { useState, useEffect } from 'react';
import api from '../../api';

const Aircraft = () => {
  const [aircraft, setAircraft] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    model: '',
    airlineName: '',
    numberOfPassengers: 0,
    airportId: {
      airportId: null
    }
  });

  // Fetch aircraft and airports from database //
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aircraftData, airportsData] = await Promise.all([
          api.aircraft.getAllAircraft(),
          api.airports.getAllAirports()
        ]);
        setAircraft(aircraftData);
        setAirports(airportsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const fetchAircraft = async () => {
    try {
      setLoading(true);
      const data = await api.aircraft.getAllAircraft();
      setAircraft(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load aircraft. Please try again later.');
      setLoading(false);
      console.error('Error fetching aircraft:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfPassengers') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAirportSelect = (e) => {
    const airportId = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      airportId: {
        airportId: airportId
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.aircraft.createAircraft(formData);
      setFormData({
        model: '',
        airlineName: '',
        numberOfPassengers: 0,
        airportId: {
          airportId: null
        }
      });
      setShowForm(false);
      fetchAircraft(); // Refresh aircraft list
    } catch (err) {
      setError('Failed to add aircraft. Please try again.');
      console.error('Error adding aircraft:', err);
    }
  };

  const handleDelete = async (aircraftId) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await api.aircraft.deleteAircraft(aircraftId);
        fetchAircraft(); // Refresh aircraft list
      } catch (err) {
        setError('Failed to delete aircraft. Please try again.');
        console.error('Error deleting aircraft:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading aircraft...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="aircraft-container">
      <div className="aircraft-header">
        <h2>Aircraft Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Aircraft'}
        </button>
      </div>

      {showForm && (
        <form className="aircraft-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="model">Aircraft Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              value={formData.model}
              onChange={handleInputChange}
              required
              placeholder="e.g. Boeing 737"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="airlineName">Airline Name</label>
            <input
              type="text"
              id="airlineName"
              name="airlineName"
              className="form-control"
              value={formData.airlineName}
              onChange={handleInputChange}
              required
              placeholder="e.g. Air Canada"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="numberOfPassengers">Number of Passengers</label>
            <input
              type="number"
              id="numberOfPassengers"
              name="numberOfPassengers"
              className="form-control"
              value={formData.numberOfPassengers}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="airportId">Home Airport</label>
            <select
              id="airportId"
              name="airportId"
              className="form-control"
              onChange={handleAirportSelect}
              required
            >
              <option value="">Select Airport</option>
              {airports.map(airport => (
                <option key={airport.airportId} value={airport.airportId}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-success">
            Add Aircraft
          </button>
        </form>
      )}

      <h3>Aircraft List</h3>
      {aircraft.length === 0 ? (
        <p>No aircraft found. Add a new aircraft to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Airline</th>
              <th>Passengers</th>
              <th>Home Airport</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {aircraft.map((aircraft) => (
              <tr key={aircraft.aircraftId}>
                <td>{aircraft.aircraftId}</td>
                <td>{aircraft.type || aircraft.model}</td>
                <td>{aircraft.airlineName}</td>
                <td>{aircraft.numberOfPassengers}</td>
                <td>{aircraft.airportId?.name || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(aircraft.aircraftId)}
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

export default Aircraft;