# 📞 Telecom Call Management System (Java)

A console-based Java application to simulate a telecom backend system with features like customer registration, call simulation, call logging, and billing.

---

## ✅ Features

- **Customer Module**: Register, view customers; activate Prepaid/Postpaid plans.
- **Call Simulation**: Real-time multithreaded call simulation; logs start time, end time, duration.
- **Call Logs**: View detailed call history.
- **Billing**: Monthly bill generation using plan-based per-minute charges.

---

## 🧠 Design & Principles

- **Design Patterns**:
  - Singleton: `BillingEngine`
  - Factory: `PlanFactory`
- **SOLID Principles**:
  - SRP, OCP, LSP, ISP, DIP applied in class design.

---

## 🗂️ Structure

TelecomCallManagementSystem/
  TelecomCallManagementSystem.java         # Main entry point (menu)

  model/                                   # Domain models
    Customer.java
    CallLog.java

  plan/                                    # Plan abstraction & factory
    Plan.java
    PrepaidPlan.java
    PostpaidPlan.java
    PlanFactory.java
    
 manager/                                 # Singleton call log manager
    CallManager.java                

  billing/                                 # Billing logic (Singleton)
    BillingEngine.java

  service/                                 # Services & multithreading
    CustomerService.java
    CallSimulator.java
