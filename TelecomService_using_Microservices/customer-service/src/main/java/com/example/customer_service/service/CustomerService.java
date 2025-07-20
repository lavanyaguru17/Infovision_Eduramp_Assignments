package com.example.customer_service.service;

import com.example.customer_service.entity.Customer;
import com.example.customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(String id) {
        return customerRepository.findById(id)
                .orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        if (customer.getCustomerId() == null) {
            customer.setCustomerId(UUID.randomUUID().toString());
        }
        return customerRepository.save(customer);
    }


    public Customer updateCustomer(String id, Customer updatedCustomer) {
        Optional<Customer> optional = customerRepository.findById(id);
        if (optional.isPresent()) {
            Customer customer = optional.get();
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setMobileNumber(updatedCustomer.getMobileNumber());
            return customerRepository.save(customer);
        }
        return null;
    }

    public boolean deleteCustomer(String id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
