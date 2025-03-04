package com.plane.domain;

import java.util.List;

public class City {
    private long cityId;
    private String name;
    private String country;

    private List<Airport> airports;

    public City() {
    }

    public City(long cityId, String name, String country, List<Airport> airports) {
        this.cityId = cityId;
        this.name = name;
        this.country = country;
        this.airports = airports;
    }

    public long getCityId() {
        return cityId;
    }

    public void setCityId(long cityId) {
        this.cityId = cityId;
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
