package com.example.recharge_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.recharge_service.entity.Recharge;

import java.util.List;

public interface RechargeRepository extends JpaRepository<Recharge, String> {
    List<Recharge> findByCustomerIdOrderByRechargeDateDesc(String customerId);
}
