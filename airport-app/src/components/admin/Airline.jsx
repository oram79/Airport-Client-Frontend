import React, { useState, useEffect } from 'react';
import api from '../../api';

const Airline = () => {
  const [airlines, setAirlines] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airlineName: '',
    originCountry: '',
    flightList: []
  });

  // Fetch airlines and flights on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airlinesData, flightsData] = await Promise.all([
          api.airlines.getAllAirlines(),
          api.flights.getAllFlights()
        ]);
        setAirlines(airlinesData);
        setFlights(flightsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const fetchAirlines = async () => {
    try {
      setLoading(true);
      const data = await api.airlines.getAllAirlines();
      setAirlines(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load airlines. Please try again later.');
      setLoading(false);
      console.error('Error fetching airlines:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.airlines.createAirline(formData);
      setFormData({
        airlineName: '',
        originCountry: '',
        flightList: []
      });
      setShowForm(false);
      fetchAirlines(); // Refresh airline list
    } catch (err) {
      setError('Failed to add airline. Please try again.');
      console.error('Error adding airline:', err);
    }
  };

  const handleDelete = async (airlineId) => {
    if (window.confirm('Are you sure you want to delete this airline?')) {
      try {
        await api.airlines.deleteAirline(airlineId);
        fetchAirlines(); // Refresh airline list
      } catch (err) {
        setError('Failed to delete airline. Please try again.');
        console.error('Error deleting airline:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading airlines...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="airline-container">
      <div className="airline-header">
        <h2>Airline Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Airline'}
        </button>
      </div>

      {showForm && (
        <form className="airline-form" onSubmit={handleSubmit}>
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
            <label htmlFor="originCountry">Country of Origin</label>
            <input
              type="text"
              id="originCountry"
              name="originCountry"
              className="form-control"
              value={formData.originCountry}
              onChange={handleInputChange}
              required
              placeholder="e.g. Canada"
            />
          </div>
          
          <button type="submit" className="btn btn-success">
            Add Airline
          </button>
        </form>
      )}

      <h3>Airline List</h3>
      {airlines.length === 0 ? (
        <p>No airlines found. Add a new airline to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline Name</th>
              <th>Country of Origin</th>
              <th>Number of Flights</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((airline) => (
              <tr key={airline.airlineId}>
                <td>{airline.airlineId}</td>
                <td>{airline.airlineName}</td>
                <td>{airline.originCountry}</td>
                <td>{airline.flightList ? airline.flightList.length : 0}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(airline.airlineId)}
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

export default Airline;