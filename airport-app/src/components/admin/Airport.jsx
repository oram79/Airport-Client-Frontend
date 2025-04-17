import React, { useState, useEffect } from 'react';
import api from '../../api';

const Airport = () => {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    cityName: {
      cityName: '',
      country: ''
    }
  });

  // Fetch airports and cities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airportsData, citiesData] = await Promise.all([
          api.airports.getAllAirports(),
          api.cities.getAllCities()
        ]);
        setAirports(airportsData);
        setCities(citiesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      const data = await api.airports.getAllAirports();
      setAirports(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load airports. Please try again later.');
      setLoading(false);
      console.error('Error fetching airports:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cityName' || name === 'country') {
      setFormData({
        ...formData,
        cityName: {
          ...formData.cityName,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCitySelect = (e) => {
    const cityId = parseInt(e.target.value, 10);
    if (cityId) {
      const selectedCity = cities.find(city => city.cityId === cityId);
      if (selectedCity) {
        setFormData({
          ...formData,
          cityName: {
            cityId: selectedCity.cityId,
            cityName: selectedCity.cityName,
            country: selectedCity.country
          }
        });
      }
    } else {
      // Reset city if "Select City" is chosen
      setFormData({
        ...formData,
        cityName: {
          cityName: '',
          country: ''
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.airports.createAirport(formData);
      setFormData({
        name: '',
        code: '',
        cityName: {
          cityName: '',
          country: ''
        }
      });
      setShowForm(false);
      fetchAirports(); // Refresh airport list
    } catch (err) {
      setError('Failed to add airport. Please try again.');
      console.error('Error adding airport:', err);
    }
  };

  const handleDelete = async (airportId) => {
    if (window.confirm('Are you sure you want to delete this airport?')) {
      try {
        await api.airports.deleteAirport(airportId);
        fetchAirports(); // Refresh airport list
      } catch (err) {
        setError('Failed to delete airport. Please try again.');
        console.error('Error deleting airport:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading airports...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="airport-container">
      <div className="airport-header">
        <h2>Airport Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Airport'}
        </button>
      </div>

      {showForm && (
        <form className="airport-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Airport Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="code">Airport Code</label>
            <input
              type="text"
              id="code"
              name="code"
              className="form-control"
              value={formData.code}
              onChange={handleInputChange}
              required
              maxLength="3"
              placeholder="e.g. YYZ"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select
              id="city"
              className="form-control"
              onChange={handleCitySelect}
              required
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}, {city.country}
                </option>
              ))}
            </select>
          </div>
          
          {formData.cityName.cityName === '' && (
            <>
              <div className="form-group">
                <label htmlFor="cityName">City Name (if not in list)</label>
                <input
                  type="text"
                  id="cityName"
                  name="cityName"
                  className="form-control"
                  value={formData.cityName.cityName}
                  onChange={handleInputChange}
                  placeholder="Enter city name if not in the dropdown"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country (if not in list)</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  value={formData.cityName.country}
                  onChange={handleInputChange}
                  placeholder="Enter country if not in the dropdown"
                />
              </div>
            </>
          )}
          
          <button type="submit" className="btn btn-success">
            Add Airport
          </button>
        </form>
      )}

      <h3>Airport List</h3>
      {airports.length === 0 ? (
        <p>No airports found. Add a new airport to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>City</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport) => (
              <tr key={airport.airportId}>
                <td>{airport.airportId}</td>
                <td>{airport.name}</td>
                <td>{airport.code}</td>
                <td>{airport.cityName?.cityName}</td>
                <td>{airport.cityName?.country}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(airport.airportId)}
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

export default Airport;