package com.plane.domain;

public class Passenger {
    private long passengerID;
    private String passengerName;
    private String passengerAddress;
    private String passengerPhone;

    private Aircraft aircraftId;

    public Passenger() {
    }

    public Passenger(long passengerID, String passengerName, String passengerAddress, String passengerPhone, Aircraft aircraftId) {
        this.passengerID = passengerID;
        this.passengerName = passengerName;
        this.passengerAddress = passengerAddress;
        this.passengerPhone = passengerPhone;
        this.aircraftId = aircraftId;
    }

    public long getPassengerID() {
        return passengerID;
    }

    public void setPassengerID(long passengerID) {
        this.passengerID = passengerID;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPassengerAddress() {
        return passengerAddress;
    }

    public void setPassengerAddress(String passengerAddress) {
        this.passengerAddress = passengerAddress;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public void setPassengerPhone(String passengerPhone) {
        this.passengerPhone = passengerPhone;
    }

    public Aircraft getAircraftId() {
        return aircraftId;
    }

    public void setAircraftId(Aircraft aircraftId) {
        this.aircraftId = aircraftId;
    }
}
