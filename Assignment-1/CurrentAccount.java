package com.day2Assignment;

public class CurrentAccount implements Account {
    private Customer customer;
    private BusinessDetails businessDetails;

    public CurrentAccount(Customer customer, BusinessDetails businessDetails) {
        this.customer = customer;
        this.businessDetails = businessDetails;
    }

    @Override
    public void openAccount() {
        System.out.println("\n\t\t\tCurrent Account Details\t\t\t");
        System.out.println("Branch Name        : " + customer.getBranch());
        System.out.println("Customer Name      : " + customer.getName());
        System.out.println("Aadhar Number      : " + customer.getAadharNumber());
        System.out.println("PAN Number         : " + customer.getPanNumber());
        System.out.println("Email ID           : " + customer.getEmailId());
        System.out.println("Phone Number       : " + customer.getPhoneNumber());
        System.out.println("Business Name      : " + businessDetails.getBusinessName());
        System.out.println("Business Type      : " + businessDetails.getBusinessType());
        System.out.println("Nature of Business : " + businessDetails.getNatureOfBusiness());
        System.out.println("GST Number         : " + businessDetails.getGstNumber());
    }

    @Override
    public String getAccountType() {
        return "Current Account";
    }

    @Override
    public Customer getCustomer() {
        return customer;
    }
}

