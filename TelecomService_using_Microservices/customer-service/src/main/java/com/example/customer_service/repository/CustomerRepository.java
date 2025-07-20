package com.example.customer_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.customer_service.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
}
