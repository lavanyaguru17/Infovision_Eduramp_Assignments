package TelecomCallManagementSystem.model;


import TelecomCallManagementSystem.plan.Plan;

public class Customer {
    private String name;
    private String phoneNumber;
    private Plan plan;

    public Customer(String name, String phoneNumber, Plan plan) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.plan = plan;
    }

    public String getName() { return name; }
    public String getPhoneNumber() { return phoneNumber; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
}

