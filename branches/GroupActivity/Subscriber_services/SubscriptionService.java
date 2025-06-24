public class SubscriptionService {

    public static void getAllSubscriptionServices(){
        System.out.println("1. Caller tune");
        System.out.println("2. Recharge plan suggestion");
    }

    public static Subscribable getServiceByName(String serviceName){
        Subscribable service=null;

        switch (serviceName){
            case "caller tune":
                service=new CallerTune();
                break;
            case "Recharge plan suggestion":
                service = new RechargePlanSuggestion();
            default:
                System.out.println("Please select a valid service name");
        }
        return service;
    }


}
