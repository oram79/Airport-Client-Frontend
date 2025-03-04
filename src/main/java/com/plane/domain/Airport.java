package com.plane.domain;

import java.util.ArrayList;
import java.util.List;

public class Airport {
    private long airportId;

    private String name;
    private String code;

    private City cityName;

    private List<Aircraft> aircrafts = new ArrayList<>();

    public Airport () {
    }

    public Airport(String code) {
        this.code = code;
    }
    
    public Airport(long airportId, String name, String code, City cityName, List<Aircraft> aircrafts) {
        this.airportId = airportId;
        this.name = name;
        this.code = code;
        this.cityName = cityName;
        this.aircrafts = aircrafts;
    }

    public long getAirportId() {
        return airportId;
    }

    public void setAirportId(long airportId) {
        this.airportId = airportId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public City getCityName() {
        return cityName;
    }

    public void setCityName(City cityName) {
        this.cityName = cityName;
    }

    public List<Aircraft> getAircrafts() {
        return aircrafts;
    }

    public void setAircrafts(List<Aircraft> aircrafts) {
        this.aircrafts = aircrafts;
    }
}
