# 🔴 Redis Service Documentation

## 1. Service Overview
*   **Service Name**: `redis`
*   **Image Used**: `redis:alpine`
*   **Port**: `6379`

## 2. Why this Image? (Vote/Rating)
*   **Rating**: ⭐⭐⭐⭐⭐ (5/5)
*   **Reason**: We used the `alpine` version.
    *   **Size**: Extremely small (~5MB).
    *   **Performance**: Superfast in-memory data store.
    *   **Security**: Minimal attack surface.

## 3. Configuration & Secrets
*   **Host**: `redis` (Internal Docker Network)
*   **Password**: None (Default for Development)
*   **Persistence**: Disabled (Data is cleared on restart for speed).

## 4. Function (কাজ)
এই সার্ভিসের মূল কাজ হলো **Caching**।
*   যখন একজন ইউজার কোনো প্রোডাক্ট সার্চ করে, রেজাল্টটি প্রথমবার ডাটাবেস থেকে আসে।
*   দ্বিতীয়বার একই সার্চ করলে সেটি **Redis** থেকে চোখের পলকে (ms) লোড হয়।
*   এটি সিস্টেমকে "সুপারফাস্ট" করে তোলে।
