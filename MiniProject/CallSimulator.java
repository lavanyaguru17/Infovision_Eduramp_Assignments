package com.day20;

import java.time.Duration;
import java.time.LocalDateTime;

class CallSimulator implements Runnable {
    private Customer caller;
    private Customer receiver;

    public CallSimulator(Customer caller, Customer receiver) {
        this.caller = caller;
        this.receiver = receiver;
    }

    @Override
    public void run() {
        LocalDateTime start = LocalDateTime.now();
        try {
            Thread.sleep((int)(Math.random() * 5000)); // Simulate call duration
             } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LocalDateTime end = LocalDateTime.now();
        long duration = Duration.between(start, end).getSeconds();

        CallLog callLog = new CallLog();
        callLog.setCaller(caller);
        callLog.setReceiver(receiver);
        callLog.setStartTime(start);
        callLog.setEndTime(end);
        callLog.setDurationInSeconds(duration);

        CallManager.getInstance().addCallLog(caller, callLog);
    }
}