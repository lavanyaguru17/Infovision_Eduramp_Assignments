package com.example.recharge_service.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "recharges")
public class Recharge {

    @Id
    @Column(name = "recharge_id", length = 50)
    private String rechargeId;

    @Column(name = "customer_id", length = 50, nullable = false)
    private String customerId;

    @Column(name = "plan_id", length = 50, nullable = false)
    private String planId;

    @Column(name = "amount")
    private double amount;

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @Column(name = "recharge_date")
    private LocalDate rechargeDate;

    @Column(name = "valid_till")
    private LocalDate validTill;

    public Recharge() {}

    public Recharge(String rechargeId, String customerId, String planId, double amount,
                    String paymentMethod, LocalDate rechargeDate, LocalDate validTill) {
        this.rechargeId = rechargeId;
        this.customerId = customerId;
        this.planId = planId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.rechargeDate = rechargeDate;
        this.validTill = validTill;
    }

    public String getRechargeId() {
        return rechargeId;
    }

    public void setRechargeId(String rechargeId) {
        this.rechargeId = rechargeId;
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
}
