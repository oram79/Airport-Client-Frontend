package com.plane.domain;

import java.util.List;

public class City {
    private long id;
    private String name;
    private String country;

    private List<Airport> airports;

    public City() {
    }

    public City(long id, String name, String country, List<Airport> airports) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.airports = airports;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<Airport> getAirports() {
        return airports;
    }

    public void setAirports(List<Airport> airports) {
        this.airports = airports;
    }
}
