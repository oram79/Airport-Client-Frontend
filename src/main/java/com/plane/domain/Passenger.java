package com.plane.domain;

public class Passenger {
    private long passengerId;

    private String name;
    private String email;

    private Aircraft airline;

    public Passenger() {
    }

    public Passenger(long passengerId, String name, String email, Aircraft airline) {
        this.passengerId = passengerId;
        this.name = name;
        this.email = email;
        this.airline = airline;
    }

    public long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(long passengerId) {
        this.passengerId = passengerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Aircraft getAirline() {
        return airline;
    }

    public void setAirline(Aircraft airline) {
        this.airline = airline;
    }
}
