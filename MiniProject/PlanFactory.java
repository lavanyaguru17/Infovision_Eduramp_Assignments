package com.day20;

class PlanFactory {
public static Plan getPlan(String type) {
    if ("prepaid".equalsIgnoreCase(type)) return new PrepaidPlan();
    if ("postpaid".equalsIgnoreCase(type)) return new PostpaidPlan();
    throw new IllegalArgumentException("Invalid plan type");
}
}
