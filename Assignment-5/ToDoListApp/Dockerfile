# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the jar file (replace with your jar name)
COPY target/ToDoListApp.jar app.jar

# Expose port (match your server.port in application.properties)
EXPOSE 8086

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
