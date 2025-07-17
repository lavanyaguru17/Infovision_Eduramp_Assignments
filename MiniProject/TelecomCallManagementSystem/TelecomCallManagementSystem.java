package TelecomCallManagementSystem;

import TelecomCallManagementSystem.billing.BillingEngine;
import TelecomCallManagementSystem.model.Customer;
import TelecomCallManagementSystem.model.CallLog;
import TelecomCallManagementSystem.service.CallSimulator;
import TelecomCallManagementSystem.service.CustomerService;
import TelecomCallManagementSystem.manager.CallManager;

import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class TelecomCallManagementSystem {
    public static void main(String[] args) throws InterruptedException {
        Scanner scanner = new Scanner(System.in);
        CustomerService customerService = new CustomerService();
        boolean running = true;

        while (running) {
            System.out.println("\n==== Telecom Call Management System ====");
            System.out.println("1. Register New Customer");
            System.out.println("2. View Registered Customers");
            System.out.println("3. Simulate a Call");
            System.out.println("4. Generate Bill");
            System.out.println("5. View Call Logs");
            System.out.println("6. Exit");
            System.out.print("Choose an option (1-6): ");

            String choice = scanner.nextLine();

            switch (choice) {
                case "1":
                    System.out.print("Enter name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter phone number: ");
                    String phone = scanner.nextLine();
                    System.out.print("Enter plan (prepaid/postpaid): ");
                    String plan = scanner.nextLine().toLowerCase();

                    Customer registeredCustomer = customerService.registerCustomer(name, phone, plan);
                    if (registeredCustomer != null) {
                        System.out.println("Customer registered successfully!");
                    } else {
                        System.out.println("Registration failed. Please try again.");
                    }

                    break;

                case "2":
                    System.out.println("\nRegistered Customers:");
                    Map<String, Customer> customers = customerService.getAllCustomers();
                    if (customers.isEmpty()) {
                        System.out.println("No customers registered.");
                    } else {
                        for (Customer c : customers.values()) {
                            System.out.printf("Name: %s | Phone: %s | Plan: %s%n",
                                    c.getName(), c.getPhoneNumber(), c.getPlan().getType());
                        }
                    }
                    break;

                case "3":
                    System.out.print("Enter caller phone number: ");
                    String caller = scanner.nextLine();
                    System.out.print("Enter receiver phone number: ");
                    String receiver = scanner.nextLine();
                    System.out.print("Enter call duration (seconds): ");
                    int duration;
                    try {
                        duration = Integer.parseInt(scanner.nextLine());
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid duration.");
                        break;
                    }

                    Customer callerCust = customerService.getCustomerByPhone(caller);
                    Customer receiverCust = customerService.getCustomerByPhone(receiver);

                    if (callerCust != null && receiverCust != null) {
                        CallSimulator call = new CallSimulator(callerCust, receiverCust, duration);
                        call.start();
                        call.join();
                        System.out.println("Call completed successfully.");
                    } else {
                        if (callerCust == null) System.out.println("Caller not found: " + caller);
                        if (receiverCust == null) System.out.println("Receiver not found: " + receiver);
                    }
                    break;

                case "4":
                    System.out.print("Enter phone number to generate bill: ");
                    String billPhone = scanner.nextLine();
                    Customer billCustomer = customerService.getCustomerByPhone(billPhone);
                    if (billCustomer != null) {
                        BillingEngine.getInstance().generateBill(billCustomer);
                    } else {
                        System.out.println("Customer not found.");
                    }
                    break;

                case "5":
                    System.out.print("Enter phone number to view call logs: ");
                    String logPhone = scanner.nextLine();
                    List<CallLog> logs = CallManager.getInstance().getLogsForCustomer(logPhone);
                    if (logs.isEmpty()) {
                        System.out.println("No call logs found for this number.");
                    } else {
                        System.out.println("Call Logs:");
                        for (CallLog log : logs) {
                            System.out.println(log);
                        }
                    }
                    break;

                case "6":
                    running = false;
                    System.out.println("Thank you!");
                    break;

                default:
                    System.out.println("Invalid choice. Please enter a number between 1-6.");
            }
        }
        scanner.close();
    }
}
