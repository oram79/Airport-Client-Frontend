package com.plane.domain;

public class Passenger {
    private long id;

    private String name;
    private String email;

    private Aircraft aircraft;

    public Passenger () {
    }

    public Passenger(long id, String name, String email, Aircraft aircraft) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.aircraft = aircraft;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }
}
