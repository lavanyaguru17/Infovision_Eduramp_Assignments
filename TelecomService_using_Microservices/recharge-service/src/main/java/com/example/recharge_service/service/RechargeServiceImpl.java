package com.example.recharge_service.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.recharge_service.client.CustomerClient;
import com.example.recharge_service.client.PlanClient;
import com.example.recharge_service.dto.CustomerDto;
import com.example.recharge_service.dto.PlanDto;
import com.example.recharge_service.dto.RechargeRequestDto;
import com.example.recharge_service.dto.RechargeResponseDto;
import com.example.recharge_service.exception.ResourceNotFoundException;
import com.example.recharge_service.entity.Recharge;
import com.example.recharge_service.repository.RechargeRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class RechargeServiceImpl implements RechargeService {

    private final RechargeRepository rechargeRepository;
    private final CustomerClient customerClient;
    private final PlanClient planClient;

    public RechargeServiceImpl(RechargeRepository rechargeRepository,
                               CustomerClient customerClient,
                               PlanClient planClient) {
        this.rechargeRepository = rechargeRepository;
        this.customerClient = customerClient;
        this.planClient = planClient;
    }

    @Override
    public RechargeResponseDto createRecharge(RechargeRequestDto  requestDto) {
        CustomerDto customer;
        try {
            customer = customerClient.getCustomerById(requestDto.getCustomerId());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Customer not found with id: " + requestDto.getCustomerId());
        }

        PlanDto plan;
        try {
            plan = planClient.getPlanById(requestDto.getPlanId());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Plan not found with id: " + requestDto.getPlanId());
        }

        LocalDate rechargeDate = requestDto.getRechargeDate() != null ? requestDto.getRechargeDate() : LocalDate.now();
        LocalDate validTill = rechargeDate.plusDays(plan.getValidityDays());


        Recharge recharge = new Recharge();
        recharge.setRechargeId(UUID.randomUUID().toString());
        recharge.setCustomerId(requestDto.getCustomerId());
        recharge.setPlanId(requestDto.getPlanId());
        recharge.setAmount(plan.getPrice());
        recharge.setPaymentMethod(requestDto.getPaymentMethod());
        recharge.setRechargeDate(rechargeDate);
        recharge.setValidTill(validTill);

        Recharge savedRecharge = rechargeRepository.save(recharge);

        RechargeResponseDto responseDto = new RechargeResponseDto();
        responseDto.setStatus("SUCCESS");
        responseDto.setMessage("Recharge successful");
        responseDto.setRechargeId(savedRecharge.getRechargeId());
        responseDto.setRechargeDate(savedRecharge.getRechargeDate());
        responseDto.setValidTill(savedRecharge.getValidTill());
        responseDto.setAmount(savedRecharge.getAmount());
        responseDto.setPaymentMethod(savedRecharge.getPaymentMethod());
        responseDto.setCustomer(customer);
        responseDto.setPlan(plan);

        return responseDto;
    }

    @Override
    public List<RechargeResponseDto> getRechargesByCustomerId(String customerId) {
        try {
            customerClient.getCustomerById(customerId);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Customer not found with id: " + customerId);
        }

        List<Recharge> recharges = rechargeRepository.findByCustomerIdOrderByRechargeDateDesc(customerId);

        return recharges.stream().map(recharge -> {
            PlanDto plan = planClient.getPlanById(recharge.getPlanId());

            CustomerDto customer = customerClient.getCustomerById(recharge.getCustomerId());

            RechargeResponseDto dto = new RechargeResponseDto();
            dto.setStatus("SUCCESS");
            dto.setMessage("Recharge fetched successfully");
            dto.setRechargeId(recharge.getRechargeId());
            dto.setRechargeDate(recharge.getRechargeDate());
            dto.setValidTill(recharge.getValidTill());
            dto.setAmount(recharge.getAmount());
            dto.setPaymentMethod(recharge.getPaymentMethod());
            dto.setCustomer(customer);
            dto.setPlan(plan);

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<RechargeResponseDto> getRechargeById(String rechargeId) {
        Recharge recharge = rechargeRepository.findById(rechargeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recharge not found with id: " + rechargeId));

        CustomerDto customer = customerClient.getCustomerById(recharge.getCustomerId());
        PlanDto plan = planClient.getPlanById(recharge.getPlanId());

        RechargeResponseDto dto = new RechargeResponseDto();
        dto.setStatus("SUCCESS");
        dto.setMessage("Recharge fetched successfully");
        dto.setRechargeId(recharge.getRechargeId());
        dto.setRechargeDate(recharge.getRechargeDate());
        dto.setValidTill(recharge.getValidTill());
        dto.setAmount(recharge.getAmount());
        dto.setPaymentMethod(recharge.getPaymentMethod());
        dto.setCustomer(customer);
        dto.setPlan(plan);

        return Optional.of(dto);
    }


    @Override
    public void deleteRecharge(String rechargeId) {
        Recharge recharge = rechargeRepository.findById(rechargeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recharge not found with id: " + rechargeId));
        rechargeRepository.delete(recharge);
    }

}
