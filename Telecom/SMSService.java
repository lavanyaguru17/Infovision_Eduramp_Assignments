package com.telecomDay3;

public class SMSService extends BaseService {
    public SMSService(double rate) {
        super("SMS Service", rate);
    }

    @Override
    protected void processPayment(int units, double amount) {
        System.out.printf("Billing SMS: %d msgs @ ₹%.2f = ₹%.2f%n", units, ratePerUnit, amount);
    }
}

