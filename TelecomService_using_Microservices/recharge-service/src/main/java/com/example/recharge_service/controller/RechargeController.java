package com.example.recharge_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.recharge_service.dto.RechargeRequestDto;
import com.example.recharge_service.dto.RechargeResponseDto;
import com.example.recharge_service.service.RechargeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    private final RechargeService rechargeService;

    public RechargeController(RechargeService rechargeService) {
        this.rechargeService = rechargeService;
    }


    @PostMapping
    public ResponseEntity<RechargeResponseDto> createRecharge(@RequestBody RechargeRequestDto requestDto) {
        RechargeResponseDto savedRecharge = rechargeService.createRecharge(requestDto);
        return new ResponseEntity<>(savedRecharge, HttpStatus.CREATED);
    }


    @GetMapping("/{rechargeId}")
    public ResponseEntity<RechargeResponseDto> getRechargeById(@PathVariable String rechargeId) {
        Optional<RechargeResponseDto> rechargeOpt = rechargeService.getRechargeById(rechargeId);
        return rechargeOpt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<RechargeResponseDto>> getRechargesByCustomer(@PathVariable String customerId) {
        List<RechargeResponseDto> recharges = rechargeService.getRechargesByCustomerId(customerId);
        return ResponseEntity.ok(recharges);
    }

    @DeleteMapping("/{rechargeId}")
    public ResponseEntity<Void> deleteRecharge(@PathVariable String rechargeId) {
        rechargeService.deleteRecharge(rechargeId);
        return ResponseEntity.noContent().build();
    }
}