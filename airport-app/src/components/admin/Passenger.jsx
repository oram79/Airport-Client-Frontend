import React, { useState, useEffect } from 'react';
import api from '../../api';

const Passenger = () => {
  const [passengers, setPassengers] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerAddress: '',
    passengerPhone: '',
    aircraftId: {
      aircraftId: null
    }
  });

  // Fetch passengers and aircraft on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [passengersData, aircraftData] = await Promise.all([
          api.passengers.getAllPassengers(),
          api.aircraft.getAllAircraft()
        ]);
        setPassengers(passengersData);
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

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const data = await api.passengers.getAllPassengers();
      setPassengers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load passengers. Please try again later.');
      setLoading(false);
      console.error('Error fetching passengers:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAircraftSelect = (e) => {
    const aircraftId = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      aircraftId: {
        aircraftId: aircraftId
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.passengers.createPassenger(formData);
      setFormData({
        passengerName: '',
        passengerAddress: '',
        passengerPhone: '',
        aircraftId: {
          aircraftId: null
        }
      });
      setShowForm(false);
      fetchPassengers(); // Refresh passenger list
    } catch (err) {
      setError('Failed to add passenger. Please try again.');
      console.error('Error adding passenger:', err);
    }
  };

  const handleDelete = async (passengerId) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      try {
        await api.passengers.deletePassenger(passengerId);
        fetchPassengers(); // Refresh passenger list
      } catch (err) {
        setError('Failed to delete passenger. Please try again.');
        console.error('Error deleting passenger:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading passengers...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="passenger-container">
      <div className="passenger-header">
        <h2>Passenger Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Passenger'}
        </button>
      </div>

      {showForm && (
        <form className="passenger-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="passengerName">Passenger Name</label>
            <input
              type="text"
              id="passengerName"
              name="passengerName"
              className="form-control"
              value={formData.passengerName}
              onChange={handleInputChange}
              required
              placeholder="e.g. John Smith"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="passengerAddress">Address</label>
            <input
              type="text"
              id="passengerAddress"
              name="passengerAddress"
              className="form-control"
              value={formData.passengerAddress}
              onChange={handleInputChange}
              required
              placeholder="e.g. 123 Main St, Toronto, ON"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="passengerPhone">Phone Number</label>
            <input
              type="text"
              id="passengerPhone"
              name="passengerPhone"
              className="form-control"
              value={formData.passengerPhone}
              onChange={handleInputChange}
              required
              placeholder="e.g. 416-555-0123"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="aircraftId">Assigned Aircraft</label>
            <select
              id="aircraftId"
              name="aircraftId"
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
            Add Passenger
          </button>
        </form>
      )}

      <h3>Passenger List</h3>
      {passengers.length === 0 ? (
        <p>No passengers found. Add a new passenger to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Aircraft</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.passengerId}>
                <td>{passenger.passengerId}</td>
                <td>{passenger.passengerName}</td>
                <td>{passenger.passengerAddress}</td>
                <td>{passenger.passengerPhone}</td>
                <td>
                  {passenger.aircraftId 
                    ? `${passenger.aircraftId.type || passenger.aircraftId.model || 'Unknown'} - ${passenger.aircraftId.airlineName || 'Unknown'}` 
                    : 'Not assigned'}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(passenger.passengerId)}
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

export default Passenger;