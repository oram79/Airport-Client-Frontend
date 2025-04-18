const API_BASE_URL = 'http://localhost:8080';

async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return true;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// default HTTP Methods //
const http = {
  get: (endpoint) => fetchData(endpoint),
  
  post: (endpoint, data) => fetchData(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => fetchData(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => fetchData(endpoint, {
    method: 'DELETE',
  }),
};


const api = {
  
  // City services - Matches CitiesController.java endpoints
  cities: {
    getAllCities: () => http.get('/listAllCities'),
    getCityById: (cityId) => http.get(`/getCityById/${cityId}`),
    createCity: (cityData) => http.post('/addNewCity', cityData),
    updateCity: (cityId, cityData) => http.put(`/updateCity/${cityId}`, cityData),
    deleteCity: (cityId) => http.delete(`/deleteCityById/${cityId}`)
  },
  
  // Airport services - Matches AirportController.java endpoints
  airports: {
    getAllAirports: () => http.get('/listAllAirports'),
    getAirportById: (airportId) => http.get(`/getAirportById/${airportId}`),
    getAirportsByCityId: (cityId) => http.get(`/getAirportsByCityId/${cityId}`),
    createAirport: (airportData) => http.post('/addNewAirport', airportData),
    updateAirport: (airportId, airportData) => http.put(`/updateAirportById/${airportId}`, airportData),
    deleteAirport: (airportId) => http.delete(`/deleteAirportById/${airportId}`),
    getAirportArrivals: (airportCode) => http.get(`/airport-arrivals?airportCode=${airportCode}`),
    getAirportDepartures: (airportCode) => http.get(`/airport-departures?airportCode=${airportCode}`)
  },
  
  // Aircraft services - Matches AircraftController.java endpoints
  aircraft: {
    getAllAircraft: () => http.get('/listAllAircrafts'),
    getAircraftById: (aircraftId) => http.get(`/getAircraftById/${aircraftId}`),
    createAircraft: (aircraftData) => http.post('/addNewAircraft', aircraftData),
    updateAircraft: (aircraftId, aircraftData) => http.put(`/updateAircraftById/${aircraftId}`, aircraftData),
    deleteAircraft: (aircraftId) => http.delete(`/deleteAircraftById/${aircraftId}`),
    getPassengersByAircraft: (aircraftId) => http.get(`/getPassengersByAircraftId/${aircraftId}`),
    addAirportToAircraft: (aircraftId, airportId) => http.post(`/${aircraftId}/airports/${airportId}`)
  },
  
  // Gate services - Matches GateController.java endpoints
  gates: {
    getAllGates: () => http.get('/getAllGates'),
    getGateById: (gateId) => http.get(`/getGateById/${gateId}`),
    getGateByTerminal: (terminal) => http.get(`/getGateByTerminal?terminal=${terminal}`),
    getGateByNumber: (number) => http.get(`/getGateByNumber?number=${number}`),
    createGate: (gateData) => http.post('/addGate', gateData),
    updateGate: (gateId, gateData) => http.put(`/updateGate/${gateId}`, gateData),
    deleteGate: (gateId) => http.delete(`/deleteGateById/${gateId}`)
  },
  
  // Flight services - Matches FlightController.java endpoints
  flights: {
    getAllFlights: () => http.get('/api/flights/get-all-flights'),
    getFlightById: (flightId) => http.get(`/api/flights/${flightId}`),
    createFlight: (flightData) => http.post('/api/flights/create-flight', flightData),
    deleteFlight: (flightId) => http.delete(`/api/flights/${flightId}`),
    getFlightsByDestination: (destination) => http.get(`/api/flights/search/by-flight-destination?flightDestination=${destination}`),
    getFlightsByOrigin: (origin) => http.get(`/api/flights/search/by-flight-origin?flightOrigin=${origin}`),
    getFlightsByAirline: (airline) => http.get(`/api/flights/search/by-flight-airline?flightAirline=${airline}`)
  },
  
  // Airline services - Matches AirlineController.java endpoints
  airlines: {
    getAllAirlines: () => http.get('/api/airlines/get-all-airlines'),
    getAirlineById: (airlineId) => http.get(`/api/airlines/${airlineId}`),
    createAirline: (airlineData) => http.post('/api/airlines/create-airline', airlineData),
    deleteAirline: (airlineId) => http.delete(`/api/airlines/${airlineId}`),
    getAirlinesByName: (airlineName) => http.get(`/api/airlines/search/by-airline-name?airlineName=${airlineName}`),
    addFlightToAirline: (airlineId, flightId) => http.post(`/api/airlines/${airlineId}/add-flight-from-airline/${flightId}`),
    getAllFlightsForAirline: (airlineId) => http.get(`/api/airlines/getAllFlightsForAirlineById/${airlineId}`)
  },
  
  // Passenger services - Matches PassengersController.java endpoints
  passengers: {
    getAllPassengers: () => http.get('/getAllPassengers'),
    getPassengerById: (passengerId) => http.get(`/findByPassengerID/${passengerId}`),
    createPassenger: (passengerData) => http.post('/addNewPassenger', passengerData),
    updatePassenger: (passengerId, passengerData) => http.put(`/updatePassengerById/${passengerId}`, passengerData),
    deletePassenger: (passengerId) => http.delete(`/deletePassengerById/${passengerId}`),
    getPassengersByAircraft: (aircraftId) => http.get(`/getAircraftForPassenger?ID=${aircraftId}`)
  }
};

export default api;