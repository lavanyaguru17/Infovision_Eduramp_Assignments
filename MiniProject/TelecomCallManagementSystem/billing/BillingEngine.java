package TelecomCallManagementSystem.billing;

import TelecomCallManagementSystem.manager.CallManager;
import TelecomCallManagementSystem.model.CallLog;
import TelecomCallManagementSystem.model.Customer;

import java.util.List;

public class BillingEngine {
    private static final BillingEngine instance = new BillingEngine();

    private BillingEngine() {}

    public static BillingEngine getInstance() {
        return instance;
    }

    public void generateBill(Customer customer) {
        List<CallLog> logs = CallManager.getInstance().getLogsForCustomer(customer.getPhoneNumber());
        double total = 0;
        for (CallLog log : logs) {
            double minutes = log.getDurationInSeconds() / 60.0;
            total += minutes * customer.getPlan().getRatePerMinute();
        }

        System.out.printf("Bill for %s (%s): ₹%.2f\n",
                customer.getName(), customer.getPhoneNumber(), total);
    }
}

