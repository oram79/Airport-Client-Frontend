import React, { useEffect, useState } from 'react';
import api from '../../api';
import ArrivalBoard from './ArrivalBoard';
import DepartureBoard from './DepartureBoard';

const HomePage = ({ selectedAirport, setSelectedAirport }) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAirport, setCurrentAirport] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        setLoading(true);
        const data = await api.airports.getAllAirports();
        setAirports(data);
        
        // If we have airports and selectedAirport is valid, set currentAirport //
        if (data.length > 0) {
          const airportToShow = data.find(airport => airport.airportId === selectedAirport) || data[0];
          setCurrentAirport(airportToShow);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load airports. Please try again later.');
        setLoading(false);
        console.error('Error fetching airports:', err);
      }
    };

    fetchAirports();
  }, [selectedAirport]);

  const handleAirportChange = (e) => {
    const airportId = parseInt(e.target.value, 10);
    setSelectedAirport(airportId);
  };

  if (loading) {
    return <div className="loading">Loading airport data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="airport-selector">
        <label htmlFor="airport-select">Select Airport:</label>
        <select
          id="airport-select"
          value={selectedAirport || ''}
          onChange={handleAirportChange}
        >
          {airports.map((airport) => (
            <option key={airport.airportId} value={airport.airportId}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>

      {currentAirport && (
        <div className="airport-info">
          <h2>{currentAirport.name} ({currentAirport.code})</h2>
          <p>Located in {currentAirport.cityName?.cityName}, {currentAirport.cityName?.country}</p>
        </div>
      )}

      <div className="boards">
        <ArrivalBoard airportCode={currentAirport?.code} />
        <DepartureBoard airportCode={currentAirport?.code} />
      </div>
    </div>
  );
};

export default HomePage;