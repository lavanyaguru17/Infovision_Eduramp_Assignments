# 📞 Telecom Services - Microservices App

A Spring Boot microservices-based telecom application using:

- ✅ **Eureka Server** – Service discovery (`http://localhost:8761`)
- ✅ **API Gateway** – Routing requests to microservices (`http://localhost:8999`)
- ✅ **Customer Service** – CRUD for customer profiles (`9001`)
- ✅ **Plan Service** – CRUD for recharge plans (`9002`)
- ✅ **Recharge Service** – Recharge using customer + plan (`9003`)

---

## 🔧 Tech Stack

- Java, Spring Boot, Spring Cloud 
- Spring Data JPA, PostgreSQL
- Eureka, OpenFeign, Gateway
- Maven, Lombok

---

## ▶️ Run Order

1. Start **Eureka Server**
2. Start **API Gateway**
3. Start **Customer**, **Plan**, then **Recharge** services

---

## 🔁 Example API Flow

1. `POST /api/customers` – Create a customer  
2. `POST /api/plans` – Create a plan  
3. `POST /api/recharges` – Recharge with customerId & planId

---

## 🧪 Sample Endpoints

| Service         | Endpoint                          |
|-----------------|-----------------------------------|
| Customer        | `GET /api/customers/{id}`         |
| Plan            | `GET /api/plans/{id}`             |
| Recharge        | `POST /api/recharges`             |

---

## 🚀 Features

- Microservices register with Eureka
- Gateway routes and filters requests
- Feign used for inter-service calls

---
