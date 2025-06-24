package com.day2Assignment;

public class BusinessDetails {
    private String businessName;
    private String businessType;
    private String natureOfBusiness;
    private String gstNumber;

    public BusinessDetails(String businessName, String businessType, String natureOfBusiness, String gstNumber) {
        this.businessName = businessName;
        this.businessType = businessType;
        this.natureOfBusiness = natureOfBusiness;
        this.gstNumber = gstNumber;
    }

    public String getBusinessName() { return businessName; }
    public String getBusinessType() { return businessType; }
    public String getNatureOfBusiness() { return natureOfBusiness; }
    public String getGstNumber() { return gstNumber; }
}

