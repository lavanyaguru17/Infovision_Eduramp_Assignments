public class RechargePlanSuggestion implements Subscribable {


    String serviceType;
    int validity;
    double amount;

    public RechargePlanSuggestion(){
        this.serviceType = "sms";
        this.validity = 21;
        this.amount = 2.00;
    }

    @Override
    public String getServiceName() {
        return "Recharge plan suggestion";
    }
}
