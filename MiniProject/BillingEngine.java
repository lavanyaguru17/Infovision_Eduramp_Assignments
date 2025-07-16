package com.day20;

import java.util.List;

public class BillingEngine {
private static final BillingEngine INSTANCE = new BillingEngine();

private BillingEngine() {}

public static BillingEngine getInstance() {
    return INSTANCE;
}

public double generateBill(Customer customer) {
    List<CallLog> logs = CallManager.getInstance().getCallLogs(customer);
    int totalMinutes = logs.stream()
            .mapToInt(log -> (int)Math.ceil(log.getDurationInSeconds() / 60.0))
            .sum();
    return customer.getPlan().calculateBill(totalMinutes);
}
}