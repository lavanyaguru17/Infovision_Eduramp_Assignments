package com.day20;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CallManager {
private static final CallManager INSTANCE = new CallManager();
private Map<Customer, List<CallLog>> callLogs = new HashMap<>();

private CallManager() {}

public static CallManager getInstance() {
    return INSTANCE;
}

public synchronized void addCallLog(Customer customer, CallLog log) {
    callLogs.computeIfAbsent(customer, k -> new ArrayList<>()).add(log);
}

public List<CallLog> getCallLogs(Customer customer) {
    return callLogs.getOrDefault(customer, new ArrayList<>());
}
}

