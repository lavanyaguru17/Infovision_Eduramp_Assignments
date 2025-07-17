package TelecomCallManagementSystem.service;

import TelecomCallManagementSystem.model.Customer;
import TelecomCallManagementSystem.plan.Plan;
import TelecomCallManagementSystem.plan.PlanFactory;

import java.util.HashMap;
import java.util.Map;

public class CustomerService {
    private Map<String, Customer> customerMap = new HashMap<>();

    public Customer registerCustomer(String name, String phoneNumber, String planType) {
        Plan plan = PlanFactory.getPlan(planType);
        Customer customer = new Customer(name, phoneNumber, plan);
        customerMap.put(phoneNumber, customer);
        return customer;
    }

    public Customer getCustomerByPhone(String phone) {
        return customerMap.get(phone);
    }

    public Map<String, Customer> getAllCustomers() {
        return customerMap;
    }
}

