package com.plane.models;

import java.util.List;

public class Aircraft {
    private long id;

    private String model;
    private String airline;
    
    private Airport departureAirport;
    private Airport arrivalAirport;
    private List<Passenger> passengers;

    public Aircraft() {
    }

    public Aircraft(long id, String model, String airline, Airport departureAirport, Airport arrivalAirport, List<Passenger> passengers) {
        this.id = id;
        this.model = model;
        this.airline = airline;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.passengers = passengers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(Airport departureAirport) {
        this.departureAirport = departureAirport;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(Airport arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }
}
