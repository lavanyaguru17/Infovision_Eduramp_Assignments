public class CallerTune implements Subscribable{


    String serviceType;
    int validity;
    double amount;
    int monthlyLimit = 3;

    public CallerTune(){
        this.serviceType = "voice";
        this.validity = 0;
        this.amount = 30.00;
    }

    @Override
    public String getServiceName() {
        return "Caller Tune";
    }

}
