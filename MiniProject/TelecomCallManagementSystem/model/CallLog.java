package TelecomCallManagementSystem.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CallLog {
    private String caller;
    private String receiver;
    private LocalDateTime start;
    private LocalDateTime end;
    private long durationInSeconds;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public CallLog(String caller, String receiver, LocalDateTime start, LocalDateTime end, long durationInSeconds) {
        this.caller = caller;
        this.receiver = receiver;
        this.start = start;
        this.end = end;
        this.durationInSeconds = durationInSeconds;
    }

    public long getDurationInSeconds() { return durationInSeconds; }
    public String getCaller() { return caller; }
    public String getReceiver() { return receiver; }

    @Override
    public String toString() {
        return String.format(
                "Caller: %s | Receiver: %s | Start: %s | End: %s | Duration: %d seconds",
                caller,
                receiver,
                start.format(formatter),
                end.format(formatter),
                durationInSeconds
        );
    }
}
