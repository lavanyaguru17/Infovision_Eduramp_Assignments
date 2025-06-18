//package com.telecomDay3;
//
//public class TelecomApp {
//    public static void main(String[] args) {
//        TelecomService sms = new SMSService(1.5);        // ₹1.5 per SMS
//        TelecomService voice = new VoiceCallService(2.0);// ₹2.0 per minute
//
//        runService(sms, 10);
//        runService(voice, 5);
//    }
//
//    private static void runService(TelecomService service, int units) {
//        service.start();
//        service.billCustomer(units);
//        service.stop();
//        System.out.println();
//    }
//}

package com.telecomDay3;

public class TelecomApp {
    public static void main(String[] args) {
        TelecomService sms = new SMSService(1.5);        
        TelecomService voice = new VoiceCallService(2.0);

        runService(sms, 10);                      
        runService(voice, 5, "Raj");              
        runService(sms);                           
    }

    
    private static void runService(TelecomService service, int units) {
        service.start();
        service.billCustomer(units);
        service.stop();
        System.out.println();
    }

  
    private static void runService(TelecomService service, int units, String customerName) {
        System.out.println("Customer: " + customerName);
        service.start();
        service.billCustomer(units);
        service.stop();
        System.out.println();
    }

    
    private static void runService(TelecomService service) {
        System.out.println("Using default usage (5 units).");
        service.start();
        service.billCustomer(5); 
        service.stop();
        System.out.println();
    }
}
