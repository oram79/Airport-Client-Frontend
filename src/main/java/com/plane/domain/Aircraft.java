package com.plane.domain;

import java.util.List;

public class Aircraft {
    private long aircraftId;

    private String model;
    private String airline;

    private List<Passenger> passengers;

    public Aircraft() {
    }

    public Aircraft(long aircraftId, String model, String airline, List<Passenger> passengers) {
        this.aircraftId = aircraftId;
        this.model = model;
        this.airline = airline;
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

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }
}
