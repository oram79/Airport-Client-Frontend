package com.plane.domain;

import java.util.ArrayList;
import java.util.List;

public class Aircraft {
    private long aircraftId;

    private String model;
    private String airlineName;
    private int numberOfPassengers;

    private Airport airportId;

    private Passenger passengerID;

    private List<Airport> airports = new ArrayList<Airport>();

    private List<Passenger> passengers = new ArrayList<>();

    public Aircraft() {
    }

    public Aircraft(long aircraftId, String model, String airlineName, int numberOfPassengers, Airport airportId, Passenger passengerID, List<Airport> airports, List<Passenger> passengers) {
        this.aircraftId = aircraftId;
        this.model = model;
        this.airlineName = airlineName;
        this.numberOfPassengers = numberOfPassengers;
        this.airportId = airportId;
        this.passengerID = passengerID;
        this.airports = airports;
        this.passengers = passengers;
    }

    public long getAircraftId() {
        return aircraftId;
    }

    public void setAircraftId(long aircraftId) {
        this.aircraftId = aircraftId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public int getNumberOfPassengers() {
        return numberOfPassengers;
    }

    public void setNumberOfPassengers(int numberOfPassengers) {
        this.numberOfPassengers = numberOfPassengers;
    }

    public Airport getAirportId() {
        return airportId;
    }

    public void setAirportId(Airport airportId) {
        this.airportId = airportId;
    }

    public Passenger getPassengerID() {
        return passengerID;
    }

    public void setPassengerID(Passenger passengerID) {
        this.passengerID = passengerID;
    }

    public List<Airport> getAirports() {
        return airports;
    }

    public void setAirports(List<Airport> airports) {
        this.airports = airports;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }
}
