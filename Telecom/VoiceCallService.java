package com.telecomDay3;

public class VoiceCallService extends BaseService {
    public VoiceCallService(double rate) {
        super("Voice Call Service", rate);
    }

    @Override
    protected void processPayment(int units, double amount) {
        System.out.printf("Billing Calls: %d mins @ ₹%.2f = ₹%.2f%n", units, ratePerUnit, amount);
    }
}