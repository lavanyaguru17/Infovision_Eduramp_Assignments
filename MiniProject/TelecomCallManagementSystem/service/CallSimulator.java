package TelecomCallManagementSystem.service;

import TelecomCallManagementSystem.manager.CallManager;
import TelecomCallManagementSystem.model.CallLog;
import TelecomCallManagementSystem.model.Customer;


import java.time.LocalDateTime;

public class CallSimulator extends Thread {
    private final Customer caller;
    private final Customer receiver;
    private final int durationInSeconds;

    public CallSimulator(Customer caller, Customer receiver, int durationInSeconds) {
        this.caller = caller;
        this.receiver = receiver;
        this.durationInSeconds = durationInSeconds;
    }

    @Override
    public void run() {
        LocalDateTime start = LocalDateTime.now();
        try {
            Thread.sleep(durationInSeconds * 1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LocalDateTime end = LocalDateTime.now();

        CallLog log = new CallLog(
                caller.getPhoneNumber(),
                receiver.getPhoneNumber(),
                start,
                end,
                durationInSeconds
        );
        CallManager.getInstance().logCall(caller.getPhoneNumber(), log);
    }
}
