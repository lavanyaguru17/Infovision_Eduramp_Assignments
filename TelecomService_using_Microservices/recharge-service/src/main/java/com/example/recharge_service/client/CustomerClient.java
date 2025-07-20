package com.example.recharge_service.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.recharge_service.dto.CustomerDto;

@FeignClient(name = "customer-service", url = "http://localhost:9001")
public interface CustomerClient {

    @GetMapping("/customers/{customerId}")
    CustomerDto getCustomerById(@PathVariable String customerId);
}
