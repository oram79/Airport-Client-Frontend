import React, { useState, useEffect } from 'react';
import api from '../../api';

const Gate = () => {
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    terminal: '',
    number: ''
  });

  // Fetch gates on component mount
  useEffect(() => {
    fetchGates();
  }, []);

  const fetchGates = async () => {
    try {
      setLoading(true);
      const data = await api.gates.getAllGates();
      setGates(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load gates. Please try again later.');
      setLoading(false);
      console.error('Error fetching gates:', err);
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
      await api.gates.createGate(formData);
      setFormData({
        terminal: '',
        number: ''
      });
      setShowForm(false);
      fetchGates(); // Refresh gate list
    } catch (err) {
      setError('Failed to add gate. Please try again.');
      console.error('Error adding gate:', err);
    }
  };

  const handleDelete = async (gateId) => {
    if (window.confirm('Are you sure you want to delete this gate?')) {
      try {
        await api.gates.deleteGate(gateId);
        fetchGates(); // Refresh gate list
      } catch (err) {
        setError('Failed to delete gate. Please try again.');
        console.error('Error deleting gate:', err);
      }
    }
  };

  if (loading) {
    return <div>Loading gates...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gate-container">
      <div className="gate-header">
        <h2>Gate Management</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Gate'}
        </button>
      </div>

      {showForm && (
        <form className="gate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="terminal">Terminal</label>
            <input
              type="text"
              id="terminal"
              name="terminal"
              className="form-control"
              value={formData.terminal}
              onChange={handleInputChange}
              required
              placeholder="e.g. A"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="number">Gate Number</label>
            <input
              type="text"
              id="number"
              name="number"
              className="form-control"
              value={formData.number}
              onChange={handleInputChange}
              required
              placeholder="e.g. 12"
            />
          </div>
          
          <button type="submit" className="btn btn-success">
            Add Gate
          </button>
        </form>
      )}

      <h3>Gate List</h3>
      {gates.length === 0 ? (
        <p>No gates found. Add a new gate to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Terminal</th>
              <th>Gate Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gates.map((gate) => (
              <tr key={gate.gateId}>
                <td>{gate.gateId}</td>
                <td>{gate.terminal}</td>
                <td>{gate.number}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(gate.gateId)}
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

export default Gate;