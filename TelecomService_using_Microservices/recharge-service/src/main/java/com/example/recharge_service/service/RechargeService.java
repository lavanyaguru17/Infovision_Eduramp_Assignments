package com.example.recharge_service.service;

import java.util.List;
import java.util.Optional;

import com.example.recharge_service.dto.RechargeRequestDto;
import com.example.recharge_service.dto.RechargeResponseDto;

public interface RechargeService {

    RechargeResponseDto createRecharge(RechargeRequestDto requestDto);

    List<RechargeResponseDto> getRechargesByCustomerId(String customerId);

    Optional<RechargeResponseDto> getRechargeById(String rechargeId);

    void deleteRecharge(String rechargeId);
}
