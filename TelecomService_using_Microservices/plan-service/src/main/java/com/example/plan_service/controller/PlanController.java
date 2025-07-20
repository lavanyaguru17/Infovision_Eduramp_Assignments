package com.example.plan_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.plan_service.service.PlanService;
import com.example.plan_service.entity.Plan;

@RestController
@RequestMapping("/plans")
public class PlanController {

    @Autowired
    private PlanService planService;

    @GetMapping
    public List<Plan> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable String id) {
        return ResponseEntity.ok(planService.getPlanById(id));
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan created = planService.createPlan(plan);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable String id, @RequestBody Plan plan) {
        Plan updated = planService.updatePlan(id, plan);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable String id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
