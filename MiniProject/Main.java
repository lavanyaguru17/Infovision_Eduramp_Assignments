package com.day20;

public class Main {
    public static void main(String[] args) {
        Customer Lavanya = new Customer();
        Lavanya.setName("Lavanya");
        Lavanya.setPhoneNumber("1234567890");
        Lavanya.setPlan(PlanFactory.getPlan("prepaid"));

        Customer Gurumoorthy = new Customer();
        Gurumoorthy.setName("Gurumoorthy");
        Gurumoorthy.setPhoneNumber("1234567891");
        Gurumoorthy.setPlan(PlanFactory.getPlan("postpaid"));

        Thread callThread = new Thread(new CallSimulator(Lavanya, Gurumoorthy));
        callThread.start();

        try {
            callThread.join(); // Wait for the call to complete
              } catch (InterruptedException e) {
            e.printStackTrace();
        }

        double bill = BillingEngine.getInstance().generateBill(Lavanya);
        System.out.println("Lavanya's Bill: ₹" + bill);

        double bill1 = BillingEngine.getInstance().generateBill(Gurumoorthy);
        System.out.println("Gurumoorthy's Bill: ₹" + bill1);

    }
}
