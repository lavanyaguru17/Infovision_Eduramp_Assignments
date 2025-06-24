public class TelecommApplication {
    public static void main(String[] args) {
        User mohan = new User("Mohan");
        UserMobileNumber Number1=mohan.addMobileNumber(1234567890);

        Number1.addServiceByName("caller tune");
        System.out.println("Service added: ");
        Number1.showSubscribedServices();

        Number1.removeServiceByName("caller tune");
        System.out.println("Now");
        Number1.showSubscribedServices();
    }
}
