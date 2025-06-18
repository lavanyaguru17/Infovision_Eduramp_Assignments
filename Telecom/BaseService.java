package com.telecomDay3;

public abstract class BaseService implements TelecomService {
    protected String serviceName;
    protected double ratePerUnit;

    public BaseService(String serviceName, double rateRatePerUnit) {
        this.serviceName = serviceName;
        this.ratePerUnit = rateRatePerUnit;
    }

    @Override
    public void start() {
        System.out.println(serviceName + " started.");
    }

    @Override
    public void stop() {
        System.out.println(serviceName + " stopped.");
    }

    @Override
    public void billCustomer(int units) {
        double amount = units * ratePerUnit;
        processPayment(units, amount);
    }

    // Abstract: subclasses provide their own payment routing logic
    protected abstract void processPayment(int units, double amount);
}
