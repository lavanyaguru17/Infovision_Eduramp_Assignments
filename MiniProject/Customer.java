package com.day20;

import java.time.LocalDateTime;

// Customer class
public class Customer {
    private String id;
    private String name;
    private String phoneNumber;
    private Plan plan;

    // Getters & Setters
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public Plan getPlan() {
        return plan;
    }
}

// CallLog class (separated from Customer)
class CallLog {
    private Customer caller;
    private Customer receiver;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationInSeconds;

    // Getters & Setters
    public Customer getCaller() {
        return caller;
    }
    public void setCaller(Customer caller) {
        this.caller = caller;
    }

    public Customer getReceiver() {
        return receiver;
    }
    public void setReceiver(Customer receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public long getDurationInSeconds() {
        return durationInSeconds;
    }
    public void setDurationInSeconds(long durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }
}

// Abstract Plan class
abstract class Plan {
    protected double ratePerMinute;

    public abstract double calculateBill(int minutes);
}

// PrepaidPlan class
class PrepaidPlan extends Plan {
    public PrepaidPlan() {
        ratePerMinute = 0.5;
    }

    @Override
    public double calculateBill(int minutes) {
        return minutes * ratePerMinute;
    }
}

// PostpaidPlan class
class PostpaidPlan extends Plan {
    public PostpaidPlan() {
        ratePerMinute = 0.8;
    }

    @Override
    public double calculateBill(int minutes) {
        return minutes * ratePerMinute;
    }
}
