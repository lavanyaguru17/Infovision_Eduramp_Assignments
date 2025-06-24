import java.util.ArrayList;

public class UserMobileNumber {
    long mobileNumber;
    ArrayList<Subscribable> servicesOpted;
    boolean active;


    public UserMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
        servicesOpted= new ArrayList<>();
        this.active = true;
    }


    public Subscribable getServiceByName(String serviceName){
        Subscribable requestedService=null;

        for(Subscribable individualService:servicesOpted){
            if(individualService.getServiceName().equalsIgnoreCase(serviceName)){
                requestedService=individualService;
                break;
            }
        }

        return requestedService;
    }

    public void addServiceByName(String serviceName){
        Subscribable requestedService = getServiceByName(serviceName);

        if(requestedService==null){
            Subscribable service = SubscriptionService.getServiceByName("caller tune");
            servicesOpted.add(service);
        }
        else{
            System.out.println(serviceName+ "already subscribed");
        }
    }

    public boolean removeServiceByName(String serviceName){
        Subscribable selectedService = getServiceByName(serviceName);

        if(selectedService==null){
            System.out.println("Service not opted");
        }
        else{
            servicesOpted.remove(selectedService);
        }

        return false;
    }

    public void showSubscribedServices(){
        if(servicesOpted.size()>0){
            for(Subscribable individualService:servicesOpted){
                System.out.println(individualService.getServiceName());
            }
        }
        else{
            System.out.println("No active service.");
        }

    }

    public long getMobileNumber(){
        return this.mobileNumber;
    }

}
