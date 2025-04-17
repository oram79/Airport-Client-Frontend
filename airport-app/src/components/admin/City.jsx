import React, { useState, useEffect } from 'react';
import api from '../../api';

const City = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cityName: '',
    country: '',
    population: '',
    airports: []
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await api.cities.getAllCities();
      setCities(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load cities. Please try again later.');
      setLoading(false);
      console.error('Error fetching cities:', err);
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
      await api.cities.createCity(formData);
      setFormData({
        cityName: '',
        country: '',
        population: '',
        airports: []
      });
      setShowForm(false);
      fetchCities(); // Refresh city list
    } catch (err) {
      setError('Failed to add city. Please try again.');
      console.error('Error adding city:', err);
    }
  };

  const handleDelete = async (cityId) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        await api.cities.deleteCity(cityId);
        fetchCities(); // Refresh city list
      } catch (err) {
        setError('Failed to delete city. Please try again.');
        console.error('Error deleting city:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading cities...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="city-container">
      <div className="city-header">
        <h2>City Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New City'}
        </button>
      </div>

      {showForm && (
        <form className="city-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cityName">City Name</label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              className="form-control"
              value={formData.cityName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="population">Population</label>
            <input
              type="text"
              id="population"
              name="population"
              className="form-control"
              value={formData.population}
              onChange={handleInputChange}
              placeholder="e.g. 1,000,000"
            />
          </div>
          
          <button type="submit" className="btn btn-success">
            Add City
          </button>
        </form>
      )}

      <h3>City List</h3>
      {cities.length === 0 ? (
        <p>No cities found. Add a new city to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>City Name</th>
              <th>Country</th>
              <th>Population</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.cityId}>
                <td>{city.cityId}</td>
                <td>{city.cityName}</td>
                <td>{city.country}</td>
                <td>{city.population}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(city.cityId)}
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

export default City;