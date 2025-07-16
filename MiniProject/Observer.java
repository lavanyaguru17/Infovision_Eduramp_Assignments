package com.day20;

interface Observer {
void notify(String message);
}
class CustomerNotifier implements Observer {
    private Customer customer;

    public CustomerNotifier(Customer customer) {
        this.customer = customer;
    }

    public void notify(String message) {
        System.out.println("Notification to " + customer.getName() + ": " + message);
    }
}

