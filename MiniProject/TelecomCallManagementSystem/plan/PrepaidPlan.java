package TelecomCallManagementSystem.plan;


public class PrepaidPlan implements Plan {
    @Override
    public double getRatePerMinute() { return 0.5; }

    @Override
    public String getType() { return "Prepaid"; }
}

