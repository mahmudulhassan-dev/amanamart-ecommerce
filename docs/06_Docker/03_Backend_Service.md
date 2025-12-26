# ☕ Backend Service Documentation

## 1. Service Overview
*   **Service Name**: `backend`
*   **Image Base**: `eclipse-temurin:21-jdk-alpine`
*   **Port**: `8080`

## 2. Why this Image? (Vote/Rating)
*   **Rating**: ⭐⭐⭐⭐⭐ (5/5)
*   **Reason**: OpenJDK 21 (LTS).
    *   **Performance**: Latest Java Virtual Machine optimizations.
    *   **Alpine**: Lightweight OS base.

## 3. Configuration & Secrets
*   **DB Connection**: Connects to `postgresdb` service (PostgreSQL).
*   **Cache Connection**: Connects to `redis` service.
*   **API Base URL**: `/api/products`

## 4. Function (কাজ)
এটি আমাদের **Business Logic Layer**।
*   ডাটাবেস থেকে ডাটা আনা।
*   রেডিসে ডাটা ক্যাশ করা।
*   সিকিউরিটি এবং ক্যালকুলেশন হ্যান্ডেল করা।
