package com.day2Assignment;

public class SavingsAccount implements Account {
    private Customer customer;
    private double minimumBalance = 500.0;

    public SavingsAccount(Customer customer) {
        this.customer = customer;
    }

    @Override
    public void openAccount() {
    	System.out.println("\n\t\t\tSavings Account Details\t\t\t");
    	System.out.println("Branch Name        : " + customer.getBranch());
        System.out.println("Customer Name      : " + customer.getName());
        System.out.println("Aadhar Number      : " + customer.getAadharNumber());
        System.out.println("PAN Number         : " + customer.getPanNumber());
        System.out.println("Email ID           : " + customer.getEmailId());
        System.out.println("Phone Number       : " + customer.getPhoneNumber());
        System.out.println("Opening Saving Account for " + customer.getName());
        System.out.println("Minimum balance required: " + minimumBalance);
    }
    

    @Override
    public String getAccountType() {
        return "Saving Account";
    }

    @Override
    public Customer getCustomer() {
        return customer;
    }
}
