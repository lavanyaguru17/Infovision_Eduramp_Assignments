package TelecomCallManagementSystem.plan;


public class PlanFactory {
    public static Plan getPlan(String type) {
        if (type.equalsIgnoreCase("prepaid")) return new PrepaidPlan();
        else if (type.equalsIgnoreCase("postpaid")) return new PostpaidPlan();
        else throw new IllegalArgumentException("Invalid plan type.");
    }
}

