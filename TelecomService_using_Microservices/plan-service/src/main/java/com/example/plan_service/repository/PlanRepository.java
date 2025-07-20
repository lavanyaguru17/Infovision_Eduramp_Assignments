package com.example.plan_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.plan_service.entity.Plan;

@Repository
public interface PlanRepository extends JpaRepository<Plan, String> {
    // You can add custom query methods here if needed
}

