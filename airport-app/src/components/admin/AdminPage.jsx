import React, { useState } from 'react';
import Aircraft from './Aircraft';
import Airline from './Airline';
import Airport from './Airport';
import City from './City';
import Flight from './Flight';
import Gate from './Gate';
import Passenger from './Passenger';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('city');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'city':
        return <City />;
      case 'airport':
        return <Airport />;
      case 'aircraft':
        return <Aircraft />;
      case 'gate':
        return <Gate />;
      case 'flight':
        return <Flight />;
      case 'airline':
        return <Airline />;
      case 'passenger':
        return <Passenger />;
      default:
        return <City />;
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Control Panel</h1>
      <p>Manage all entities of the airport system</p>
      
      <div className="admin-nav">
        <button
          className={`admin-tab ${activeTab === 'city' ? 'active' : ''}`}
          onClick={() => setActiveTab('city')}
        >
          Cities
        </button>
        <button
          className={`admin-tab ${activeTab === 'airport' ? 'active' : ''}`}
          onClick={() => setActiveTab('airport')}
        >
          Airports
        </button>
        <button
          className={`admin-tab ${activeTab === 'aircraft' ? 'active' : ''}`}
          onClick={() => setActiveTab('aircraft')}
        >
          Aircraft
        </button>
        <button
          className={`admin-tab ${activeTab === 'gate' ? 'active' : ''}`}
          onClick={() => setActiveTab('gate')}
        >
          Gates
        </button>
        <button
          className={`admin-tab ${activeTab === 'flight' ? 'active' : ''}`}
          onClick={() => setActiveTab('flight')}
        >
          Flights
        </button>
        <button
          className={`admin-tab ${activeTab === 'airline' ? 'active' : ''}`}
          onClick={() => setActiveTab('airline')}
        >
          Airlines
        </button>
        <button
          className={`admin-tab ${activeTab === 'passenger' ? 'active' : ''}`}
          onClick={() => setActiveTab('passenger')}
        >
          Passengers
        </button>
      </div>
      
      <div className="admin-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;