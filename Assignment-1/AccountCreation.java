package com.day2Assignment;

public class AccountCreation {

    public static Account createAccount(String accountType, Customer customer) {
        if (accountType.equalsIgnoreCase("saving")) {
            return new SavingsAccount(customer);
        }
        throw new IllegalArgumentException("Invalid account type or missing business details.");
    }

    public static Account createAccount(String accountType, Customer customer, BusinessDetails businessDetails) {
        if (accountType.equalsIgnoreCase("current")) {
            return new CurrentAccount(customer, businessDetails);
        }
        throw new IllegalArgumentException("Invalid account type or missing customer details.");
    }
}
