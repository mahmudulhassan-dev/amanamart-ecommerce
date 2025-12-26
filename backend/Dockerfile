# Backend Dockerfile
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy Maven Wrapper and Project Files
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

# Ensure mvnw is executable
RUN chmod +x mvnw

# Run Spring Boot
CMD ["./mvnw", "spring-boot:run"]
