package com.plane.domain;

import java.util.List;

public class Airport {
    private long id;
    private String name;
    private String code;

    private City city;
    private List<Aircraft> departingAircrafts;
    private List<Aircraft> arrivingAircrafts;

    public Airport () {
    }

    public Airport(long id, String name, String code, City city, List<Aircraft> departingAircrafts, List<Aircraft> arrivingAircrafts) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.city = city;
        this.departingAircrafts = departingAircrafts;
        this.arrivingAircrafts = arrivingAircrafts;
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

    public List<Aircraft> getDepartingAircrafts() {
        return departingAircrafts;
    }

    public void setDepartingAircrafts(List<Aircraft> departingAircrafts) {
        this.departingAircrafts = departingAircrafts;
    }

    public List<Aircraft> getArrivingAircrafts() {
        return arrivingAircrafts;
    }

    public void setArrivingAircrafts(List<Aircraft> arrivingAircrafts) {
        this.arrivingAircrafts = arrivingAircrafts;
    }
}
