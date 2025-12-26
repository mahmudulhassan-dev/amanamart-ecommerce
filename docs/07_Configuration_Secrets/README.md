# 🔐 Configuration & Secrets Vault

> **⚠️ CRITICAL WARNING**: এই ফাইলটি অত্যন্ত গোপনীয়! কখনো GitHub বা public এ share করবেন না।

---

## 📋 Table of Contents

1. [Database Configuration](#database-configuration)
2. [Redis Configuration](#redis-configuration)
3. [Backend Configuration](#backend-configuration)
4. [Frontend Configuration](#frontend-configuration)
5. [Docker Configuration](#docker-configuration)
6. [Environment Variables](#environment-variables)
7. [API Keys & Secrets](#api-keys--secrets)
8. [User Credentials](#user-credentials)
9. [JWT & Security](#jwt--security)
10. [Email Configuration](#email-configuration)
11. [File Upload Settings](#file-upload-settings)

---

## 🗄️ Database Configuration

### PostgreSQL Settings

#### Connection Details

```properties
# Database Host
DB_HOST=postgres
DB_PORT=5432

# Database Name
DB_NAME=amanamart

# Database Credentials
DB_USERNAME=postgres
DB_PASSWORD=root

# Connection URL
DB_URL=jdbc:postgresql://postgres:5432/amanamart
```

#### Connection Pool Settings

```properties
# HikariCP Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
```

#### JPA/Hibernate Settings

```properties
# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Database Initialization
spring.sql.init.mode=always
```

---

## 🔴 Redis Configuration

### Connection Settings

```properties
# Redis Host & Port
REDIS_HOST=redis
REDIS_PORT=6379

# Redis Password (if set)
REDIS_PASSWORD=

# Redis Database Index
REDIS_DATABASE=0

# Connection Timeout
spring.redis.timeout=60000
```

### Caching Strategy

```properties
# Cache Settings
spring.cache.type=redis
spring.cache.redis.time-to-live=3600000
spring.cache.redis.cache-null-values=false

# Cache Names
cache.names=products,vendors,categories,users
```

---

## ☕ Backend Configuration

### Spring Boot Application Settings

```properties
# Application Name
spring.application.name=amanamart-backend

# Server Port
server.port=8080

# Context Path (API Base URL)
server.servlet.context-path=/api

# Encoding
spring.http.encoding.charset=UTF-8
spring.http.encoding.enabled=true
```

### Logging Configuration

```properties
# Logging Level
logging.level.root=INFO
logging.level.com.amanamart=DEBUG
logging.level.org.springframework.web=INFO
logging.level.org.hibernate=INFO

# Log File
logging.file.name=logs/amanamart.log
logging.file.max-size=10MB
logging.file.max-history=30
```

### CORS Configuration

```properties
# Allowed Origins (Frontend URL)
cors.allowed.origins=http://localhost:5173,http://localhost:3000

# Allowed Methods
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS

# Allowed Headers
cors.allowed.headers=*

# Allow Credentials
cors.allow.credentials=true
```

---

## ⚛️ Frontend Configuration

### Vite Development Server

```env
# API Base URL (Backend)
VITE_API_BASE_URL=http://localhost:8080/api

# App Title
VITE_APP_TITLE=AmanaMart - Multi-Vendor Marketplace

# App Port
VITE_PORT=5173

# Enable HTTPS (Development)
VITE_HTTPS=false
```

### React Environment Variables

```env
# Node Environment
NODE_ENV=development

# Public URL
PUBLIC_URL=/

# Build Output Directory
BUILD_PATH=dist
```

### API Endpoints Reference

```javascript
const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  
  // Vendors
  VENDORS: '/vendors',
  VENDOR_PROFILE: '/vendors/profile',
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  
  // Cart
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  
  // Categories
  CATEGORIES: '/categories',
};
```

---

## 🐳 Docker Configuration

### Docker Compose Services

#### PostgreSQL Service

```yaml
Environment Variables:
  POSTGRES_DB: amanamart
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: root
  
Ports:
  Container: 5432
  Host: 5432
  
Volume:
  ./data/postgres:/var/lib/postgresql/data
```

#### Redis Service

```yaml
Ports:
  Container: 6379
  Host: 6379
  
Volume:
  ./data/redis:/data
  
Command:
  redis-server --appendonly yes
```

#### Backend Service

```yaml
Environment Variables:
  SPRING_PROFILES_ACTIVE: docker
  DB_HOST: postgres
  DB_PORT: 5432
  DB_NAME: amanamart
  DB_USERNAME: postgres
  DB_PASSWORD: root
  REDIS_HOST: redis
  REDIS_PORT: 6379
  
Ports:
  Container: 8080
  Host: 8080
  
Depends On:
  - postgres
  - redis
```

#### Frontend Service

```yaml
Environment Variables:
  VITE_API_BASE_URL: http://localhost:8080/api
  
Ports:
  Container: 5173
  Host: 5173
  
Depends On:
  - backend
```

---

## 🌍 Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=amanamart
DB_USERNAME=postgres
DB_PASSWORD=root

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your-256-bit-secret-key-change-this-in-production
JWT_EXPIRATION=86400000

# File Upload
MAX_FILE_SIZE=10MB
UPLOAD_DIR=./uploads

# Email (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Application
APP_NAME=AmanaMart
APP_URL=http://localhost:8080
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# App Configuration
VITE_APP_NAME=AmanaMart
VITE_APP_VERSION=1.0.1

# Features Toggle
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CHAT=false
```

---

## 🔑 API Keys & Secrets

### JWT Secret Key

```
Current Key: your-256-bit-secret-key-change-this-in-production
Type: HS256
Expiration: 24 hours (86400000 ms)

⚠️ MUST CHANGE IN PRODUCTION!

Generate new key command:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Database Encryption Keys

```
Encryption Algorithm: AES-256-GCM
Key Rotation: Every 90 days (recommended)

⚠️ Store in secure vault in production
```

---

## 👥 User Credentials

### Default Admin Account

```
Username: admin
Email: admin@amanamart.com
Password: Admin@123456
Role: ADMIN

⚠️ Change password immediately after first login!
```

### Test Vendor Account

```
Username: vendor_test
Email: vendor@amanamart.com
Password: Vendor@123456
Role: VENDOR
```

### Test Customer Account

```
Username: customer_test
Email: customer@amanamart.com
Password: Customer@123456
Role: CUSTOMER
```

---

## 🔐 JWT & Security

### JWT Configuration

```properties
# Secret Key
jwt.secret=${JWT_SECRET:your-256-bit-secret-key-change-this-in-production}

# Token Expiration (24 hours)
jwt.expiration=86400000

# Refresh Token Expiration (7 days)
jwt.refresh.expiration=604800000

# Token Prefix
jwt.token.prefix=Bearer 

# Header Name
jwt.header.name=Authorization
```

### Password Policy

```
Minimum Length: 8 characters
Must Contain:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character

Hashing Algorithm: BCrypt
Salt Rounds: 10
```

### Security Headers

```properties
# Enable HTTPS in Production
server.ssl.enabled=false

# Security Headers
security.headers.xss-protection=1; mode=block
security.headers.content-type-options=nosniff
security.headers.frame-options=DENY
security.headers.hsts=max-age=31536000; includeSubDomains
```

---

## 📧 Email Configuration

### SMTP Settings

```properties
# SMTP Server
spring.mail.host=smtp.gmail.com
spring.mail.port=587

# Credentials
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# TLS/SSL
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

# From Email
mail.from.email=noreply@amanamart.com
mail.from.name=AmanaMart
```

### Email Templates

```
Location: src/main/resources/templates/email/

Templates:
  - welcome.html (User registration)
  - order-confirmation.html (Order placed)
  - vendor-approval.html (Vendor approved)
  - password-reset.html (Reset password)
```

---

## 📁 File Upload Settings

### Upload Configuration

```properties
# Maximum File Size
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB

# Upload Directory
file.upload.dir=./uploads

# Allowed Extensions
file.upload.allowed.extensions=jpg,jpeg,png,gif,pdf

# Image Resize
image.max.width=1920
image.max.height=1080
image.thumbnail.size=300
```

### Storage Structure

```
uploads/
├── products/
│   ├── images/
│   └── thumbnails/
├── vendors/
│   ├── logos/
│   ├── banners/
│   └── documents/
└── users/
    └── avatars/
```

---

## 🛠️ Development vs Production

### Development Settings

```properties
# Debug Mode
debug=true

# Hot Reload
spring.devtools.restart.enabled=true

# H2 Console (if using H2 for dev)
spring.h2.console.enabled=false

# Show SQL
spring.jpa.show-sql=true
```

### Production Settings

```properties
# Debug Mode
debug=false

# Hot Reload
spring.devtools.restart.enabled=false

# Show SQL
spring.jpa.show-sql=false

# Compression
server.compression.enabled=true

# Production Database
spring.jpa.hibernate.ddl-auto=validate
```

---

## 📝 Quick Reference

### PostgreSQL Access

```bash
# Via Docker
docker exec -it amanamart-postgres psql -U postgres -d amanamart

# Connection String
postgresql://postgres:root@localhost:5432/amanamart
```

### Redis Access

```bash
# Via Docker
docker exec -it amanamart-redis redis-cli

# Test Connection
redis-cli ping
```

### Backend API Base URL

```
Development: http://localhost:8080/api
Production: https://api.amanamart.com/api
```

### Frontend URLs

```
Development: http://localhost:5173
Production: https://amanamart.com
```

---

## 🔄 Update History

| Date | Version | Changes |
|------|---------|---------|
| 2025-12-26 | 1.0.1 | Initial configuration documentation |

---

## ⚠️ Security Reminders

1. **Never commit this file to GitHub**
2. **Change all default passwords**
3. **Use environment variables in production**
4. **Rotate JWT secrets regularly**
5. **Enable HTTPS in production**
6. **Use strong database passwords**
7. **Keep dependencies updated**
8. **Regular security audits**

---

**Last Updated**: December 26, 2025  
**Maintained By**: Development Team
