package com.example.recharge_service.dto;

import java.time.LocalDate;

public class RechargeRequestDto {

    private String customerId;
    private String planId;
    private String paymentMethod;
    private LocalDate rechargeDate;

    public RechargeRequestDto() {}

    public RechargeRequestDto(String customerId, String planId, double amount, String paymentMethod, LocalDate rechargeDate) {
        this.customerId = customerId;
        this.planId = planId;
        this.paymentMethod = paymentMethod;
        this.rechargeDate = rechargeDate;
    }


    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getRechargeDate() {
        return rechargeDate;
    }

    public void setRechargeDate(LocalDate rechargeDate) {
        this.rechargeDate = rechargeDate;
    }
}
