package com.example.customer_service.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @Column(name = "customer_id", length = 50)
    private String customerId;

    private String name;
    private String email;

    @Column(name = "mobile")
    private String mobileNumber;

    public Customer() {
    }

    public Customer(String name, String email, String mobileNumber) {
        this.customerId = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
    }

    public Customer(String customerId, String name, String email, String mobileNumber) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
    }

    public String getCustomerId() {
        return customerId;
    }
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
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

    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
