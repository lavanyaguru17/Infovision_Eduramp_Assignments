package TelecomCallManagementSystem.plan;

public class PostpaidPlan implements Plan {
    @Override
    public double getRatePerMinute() { return 0.3; }

    @Override
    public String getType() { return "Postpaid"; }
}

