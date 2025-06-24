package com.day2Assignment;

import java.util.Scanner;

public class AccountCreationApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean continueApp = true;

        System.out.println("\t\t\tWelcome to Bank Account Opening System\t\t\t");

        while (continueApp) {
            System.out.print("\nEnter Account Type to open (saving/current): ");
            String accountType = scanner.nextLine().toLowerCase();
            
            System.out.print("Enter Branch Name: ");
            String branch = scanner.nextLine();

            System.out.print("Enter your Name: ");
            String name = scanner.nextLine();
            if (!Validation.isValidName(name)) {
                System.out.println("Invalid name! Only alphabets allowed.");
                continue;
            }

            System.out.print("Enter your Aadhar Number (12 digits): ");
            String aadhar = scanner.nextLine();
            if (!Validation.isValidAadhar(aadhar)) {
                System.out.println("Invalid Aadhar Number! Must be 12 digits.");
                continue;
            }

            System.out.print("Enter your PAN Number (e.g., ABCDE1234F): ");
            String pan = scanner.nextLine();

            System.out.print("Enter your Email ID: ");
            String email = scanner.nextLine();
            if (!Validation.isValidEmail(email)) {
                System.out.println("Invalid Email ID!");
                continue;
            }

            System.out.print("Enter your Phone Number (10 digits): ");
            String phone = scanner.nextLine();
            if (!Validation.isValidPhone(phone)) {
                System.out.println("Invalid Phone Number! Must be 10 digits.");
                continue;
            }

            Customer customer = new Customer(branch,name, aadhar, pan, email, phone);

            try {
                Account account;

                if (accountType.equals("current")) {
                    System.out.print("Enter Business Name: ");
                    String businessName = scanner.nextLine();

                    System.out.print("Enter Business Type (Proprietorship/Partnership/Pvt Ltd): ");
                    String businessType = scanner.nextLine();

                    System.out.print("Enter Nature of Business: ");
                    String natureOfBusiness = scanner.nextLine();

                    System.out.print("Enter GST Number (Optional): ");
                    String gstNumber = scanner.nextLine();

                    BusinessDetails businessDetails = new BusinessDetails(businessName, businessType, natureOfBusiness, gstNumber);

                    account = AccountCreation.createAccount(accountType, customer, businessDetails);
                } else if (accountType.equals("saving")) {
                    account = AccountCreation.createAccount(accountType, customer);
                } else {
                    System.out.println("Invalid account type entered.");
                    continue;
                }

                account.openAccount();
                System.out.println(account.getAccountType() + " opened successfully for " + customer.getName());

            } catch (IllegalArgumentException e) {
                System.out.println("Account creation failed: " + e.getMessage());
            }

            System.out.print("\nDo you want to open another account? (yes/no): ");
            String response = scanner.nextLine().trim().toLowerCase();

            if (!response.equals("yes")) {
                continueApp = false;
                System.out.println("Thank you for using the Bank Account Opening System. Goodbye!");
            }
        }

        scanner.close();
    }
}
