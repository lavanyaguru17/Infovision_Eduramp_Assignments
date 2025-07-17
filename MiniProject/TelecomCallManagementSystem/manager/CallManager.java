package TelecomCallManagementSystem.manager;

import TelecomCallManagementSystem.model.CallLog;

import java.util.*;

public class CallManager {
    private static final CallManager instance = new CallManager();
    private final Map<String, List<CallLog>> callLogs = new HashMap<>();

    private CallManager() {}

    public static CallManager getInstance() {
        return instance;
    }

    public synchronized void logCall(String phone, CallLog log) {
        callLogs.computeIfAbsent(phone, k -> new ArrayList<>()).add(log);
    }

    public List<CallLog> getLogsForCustomer(String phone) {
        return callLogs.getOrDefault(phone, new ArrayList<>());
    }
}

