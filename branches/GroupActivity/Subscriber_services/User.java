import java.util.ArrayList;

public class User {
    private String userName;
    private ArrayList<UserMobileNumber> mobileNumbers;

    public User(String name) {
        this.userName = name;
        mobileNumbers=new ArrayList<>();
    }

    public UserMobileNumber addMobileNumber(long newMobile){
        UserMobileNumber newNumber = new UserMobileNumber(newMobile);
        mobileNumbers.add(newNumber);
        return newNumber;
    }

    public void showActiveMobile(){
        for (UserMobileNumber mobile:mobileNumbers){
            if(mobile.active){
                System.out.println(mobile.getMobileNumber());
            }
        }
    }


}
