package com.example.recharge_service.dto;

import java.time.LocalDate;

public class RechargeResponseDto {

    private String status;
    private String message;

    private String rechargeId;
    private LocalDate rechargeDate;
    private LocalDate validTill;
    private double amount;
    private String paymentMethod;

    private CustomerDto customer;
    private PlanDto plan;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRechargeId() {
        return rechargeId;
    }

    public void setRechargeId(String rechargeId) {
        this.rechargeId = rechargeId;
    }

    public LocalDate getRechargeDate() {
        return rechargeDate;
    }

    public void setRechargeDate(LocalDate rechargeDate) {
        this.rechargeDate = rechargeDate;
    }

    public LocalDate getValidTill() {
        return validTill;
    }

    public void setValidTill(LocalDate validTill) {
        this.validTill = validTill;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public CustomerDto getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    public PlanDto getPlan() {
        return plan;
    }

    public void setPlan(PlanDto plan) {
        this.plan = plan;
    }
}


