package com.day2Assignment;

public class Validation {
    
    public static boolean isValidAadhar(String aadhar) {
        return aadhar != null && aadhar.matches("\\d{12}");
    }

    public static boolean isValidName(String name) {
        return name != null && name.matches("^[A-Za-z][A-Za-z0-9]*$");
        
    }

    public static boolean isValidEmail(String email) {
        return email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$");
    }

    public static boolean isValidPhone(String phone) {
        return phone.matches("\\d{10}");
    }

    
}

