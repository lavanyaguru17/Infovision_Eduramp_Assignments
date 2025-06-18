package com.telecomDay3;

public interface TelecomService {
    void start();               // start the service
    void stop();                // stop it
    void billCustomer(int units);
}
