import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/main/Header';
import Navbar from './components/main/Navbar';
import Footer from './components/main/Footer';
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import './styles.css';

function App() {
  const [selectedAirport, setSelectedAirport] = useState(1); // automatically sets to first airport available //

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  selectedAirport={selectedAirport}
                  setSelectedAirport={setSelectedAirport}
                />
              }
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
