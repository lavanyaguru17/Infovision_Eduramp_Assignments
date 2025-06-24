package com.day2Assignment;

public class Customer {
	private String branch;
    private String name;
    private String aadharNumber;
    private String panNumber;
    private String address;
    private String emailId;
    private String phoneNumber;

    public Customer(String branch, String name, String aadharNumber, String panNumber, String emailId, String phoneNumber) {
        this.branch = branch;
    	this.name = name;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
    }
    
    
    public String getBranch() {
        return branch;
    }
    
    public String getName() {
        return name;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public String getEmailId() {
        return emailId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }
}
