package com.plane.domain;

import java.util.List;

public class Airport {
    private long airportId;
    private String name;
    private String code;

    private City city;

    public Airport () {
    }

    public Airport(long airportId, String name, String code, City city) {
        this.airportId = airportId;
        this.name = name;
        this.code = code;
        this.city = city;
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

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
