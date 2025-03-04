package com.plane.domain;

import java.util.ArrayList;
import java.util.List;

public class City {
    private long cityId;

    private String cityName;
    private String country;

    private List<Airport> airports = new ArrayList<Airport>();
    private String population;

    public City() {
    }

    public City(long cityId, String cityName, String country, List<Airport> airports, String population) {
        this.cityId = cityId;
        this.cityName = cityName;
        this.country = country;
        this.airports = airports;
        this.population = population;
    }

    public long getCityId() {
        return cityId;
    }

    public void setCityId(long cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
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

    public String getPopulation() {
        return population;
    }

    public void setPopulation(String population) {
        this.population = population;
    }
}
