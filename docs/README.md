# 📚 সম্পূর্ণ ডকুমেন্টেশন সূচিপত্র - আপডেটেড

> **Version 1.0.2** | সব configuration, password এবং notes এক জায়গায়

---

## 🗂️ ডকুমেন্টেশন ক্যাটাগরি

### 1. 🌿 [Git ইন্টিগ্রেশন](00_Git_Integration/README.md)
**বিষয়বস্তু**:
- Git ইনস্টলেশন এবং সেটআপ
- GitHub repository তৈরি
- Daily commands এবং workflow
- Troubleshooting

**নতুন আপডেট**:
- ✅ Automation workflow যুক্ত হয়েছে
- ✅ `/git-commit-push` command দিয়ে auto update

---

### 2. 🚀 [শুরু করার গাইড](01_Setup/README.md)
**বিষয়বস্তু**:
- Docker ইনস্টলেশন
- প্রজেক্ট সেটআপ
- সব সার্ভিস রান করা

---

### 3. ☕ [ব্যাকএন্ড API](02_Backend_API/README.md)
**বিষয়বস্তু**:
- Spring Boot configuration
- API endpoints
- Database models
- Business logic

---

### 4. ⚛️ [ফ্রন্টএন্ড React](03_Frontend_React/README.md)
**বিষয়বস্তু**:
- React components
- Vite configuration
- Tailwind CSS setup
- State management

---

### 5. 📊 [ড্যাশবোর্ড](04_Dashboard/README.md)
**বিষয়বস্তু**:
- Admin panel
- Vendor dashboard
- Analytics এবং reports

---

### 6. 🛠️ [সমস্যা সমাধান](05_Troubleshooting/README.md)
**বিষয়বস্তু**:
- Common issues
- Docker problems
- Database errors
- Solutions এবং fixes

---

### 7. 🐳 [ডকার সার্ভিস](06_Docker/README.md)
**বিষয়বস্তু**:
- PostgreSQL configuration
- Redis setup
- Backend container
- Frontend container
- nginx (upcoming)

**Docker Services**:
1. `postgres` - Port 5432
2. `redis` - Port 6379
3. `backend` - Port 8080
4. `frontend` - Port 5173

---

### 8. 🔐 [কনফিগারেশন এবং সিক্রেটস](07_Configuration_Secrets/README.md) ⭐ **নতুন**

**⚠️ অত্যন্ত গোপনীয়! GitHub এ push করবেন না!**

#### 📋 এতে রয়েছে:

##### Database Configuration
```
Host: postgres
Port: 5432
Database: amanamart
Username: postgres  
Password: root
```

##### Redis Configuration
```
Host: redis
Port: 6379
Password: (empty)
```

##### JWT Security
```
Secret: your-256-bit-secret-key-change-this-in-production
Expiration: 24 hours
```

##### User Credentials
```
Admin:
  Email: admin@amanamart.com
  Password: Admin@123456

Vendor (Test):
  Email: vendor@amanamart.com
  Password: Vendor@123456

Customer (Test):
  Email: customer@amanamart.com
  Password: Customer@123456
```

##### API Base URLs
```
Backend: http://localhost:8080/api
Frontend: http://localhost:5173
```

##### Email SMTP (Optional)
```
Host: smtp.gmail.com
Port: 587
Username: your-email@gmail.com
Password: your-app-password
```

---

### 9. 📂 [ক্যাটাগরি এবং সাব-ক্যাটাগরি](08_Categories/README.md) ⭐ **নতুন**

**10টি প্রধান ক্যাটাগরি**:

1. 👗 **পোশাক এবং ফ্যাশন**
   - পুরুষদের পোশাক (টি-শার্ট, শার্ট, প্যান্ট, জিন্স)
   - মহিলাদের পোশাক (শাড়ি, সালোয়ার, কুর্তি, ম্যাক্সি)
   - শিশুদের পোশাক
   - জুতা (পুরুষ/মহিলা/শিশু)
   - এক্সেসরিজ (ব্যাগ, ওয়ালেট, বেল্ট, ঘড়ি)

2. 💄 **সৌন্দর্য এবং স্বাস্থ্য**
   - মেকআপ
   - স্কিনকেয়ার
   - হেয়ারকেয়ার
   - পার্সোনাল কেয়ার

3. 📱 **ইলেকট্রনিক্স**
   - মোবাইল এবং ট্যাবলেট
   - কম্পিউটার এবং ল্যাপটপ
   - অডিও/ভিডিও
   - ক্যামেরা
   - গেমিং

4. 🏠 **হোম এবং লাইফস্টাইল**
   - ফার্নিচার
   - হোম ডেকোর
   - কিচেন এবং ডাইনিং
   - বাথরুম

5. 📚 **বই এবং স্টেশনারি**
   - উপন্যাস
   - শিক্ষা বই
   - ধর্মীয় বই
   - স্টেশনারি

6. 🎮 **খেলনা এবং শিশু পণ্য**
   - খেলনা
   - বেবি কেয়ার
   - বেবি গিয়ার

7. ⚽ **খেলাধুলা এবং আউটডোর**
   - ক্রীড়া সামগ্রী
   - ফিটনেস
   - আউটডোর

8. 🍔 **খাদ্য এবং পানীয়**
   - তাজা খাবার
   - প্যাকেজড ফুড
   - পানীয়

9. 🏥 **স্বাস্থ্য এবং ওষুধ**
   - ওষুধ
   - মেডিকেল ডিভাইস

10. 🚗 **অটোমোবাইল**
    - গাড়ির যন্ত্রাংশ
    - গাড়ির এক্সেসরিজ

**মোট sub-categories**: 50+

---

## 📁 Environment Variables

### Backend (.env.example)

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

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Frontend (.env.example)

```env
# API
VITE_API_BASE_URL=http://localhost:8080/api

# App
VITE_APP_NAME=AmanaMart
VITE_APP_VERSION=1.0.2

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CHAT=false
```

---

## 🔧 Quick Start Commands

### Docker Commands

```bash
# সব services চালু করুন
docker-compose up -d

# Logs দেখুন
docker-compose logs -f

# Services বন্ধ করুন
docker-compose down

# সবকিছু মুছে আবার শুরু করুন
docker-compose down -v
docker-compose up -d --build
```

### Git Automation

```bash
# Auto version increment + commit + push
.\scripts\git-autopush.ps1

# Custom message সহ
.\scripts\git-autopush.ps1 -commitMessage "feat: added new feature"

# শুধু version increment
.\scripts\auto-version.ps1
```

### Database Access

```bash
# PostgreSQL access
docker exec -it amanamart-postgres psql -U postgres -d amanamart

# Redis access
docker exec -it amanamart-redis redis-cli
```

---

## 🎯 Multi-Vendor Features (Upcoming)

### Planned Features:
- ✅ Version management - **Complete**
- ✅ Configuration documentation - **Complete**  
- ✅ Category structure - **Complete**
- ⏳ User authentication (JWT)
- ⏳ Vendor registration & approval
- ⏳ Product management
- ⏳ Order processing
- ⏳ Admin panel
- ⏳ Payment gateway integration
- ⏳ Shipping integration

---

## 📊 Project Structure

```
devamanamart-ecommerce/
├── 📁 backend/                 # Spring Boot API
│   ├── src/main/java/
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── 📁 frontend/                # React + Vite
│   ├── src/
│   ├── public/
│   ├── .env.example           # ⭐ New
│   └── package.json
│
├── 📁 docs/                    # Documentation
│   ├── 00_Git_Integration/
│   ├── 01_Setup/
│   ├── 02_Backend_API/
│   ├── 03_Frontend_React/
│   ├── 04_Dashboard/
│   ├── 05_Troubleshooting/
│   ├── 06_Docker/
│   ├── 07_Configuration_Secrets/  # ⭐ New
│   ├── 08_Categories/             # ⭐ New
│   └── README.md (এই ফাইল)
│
├── 📁 scripts/                 # Automation
│   ├── auto-version.ps1
│   └── git-autopush.ps1
│
├── 📁 .agent/workflows/        # Workflows
│   └── git-commit-push.md
│
├── 🐳 docker-compose.yml
├── 📄 version.json             # Version management
├── 📄 .env.example            # ⭐ New
├── 📄 .gitignore
└── 📄 README.md
```

---

## 🔒 Security Checklist

- [ ] Change all default passwords
- [ ] Generate new JWT secret key
- [ ] Set up email SMTP properly
- [ ] Enable HTTPS in production
- [ ] Configure CORS correctly
- [ ] Regular dependency updates
- [ ] Backup database regularly
- [ ] Monitor logs

---

## 📝 Update Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.2 | 2025-12-26 | Configuration docs + Category structure |
| 1.0.1 | 2025-12-26 | Automation scripts + GitHub push |
| 1.0.0 | 2025-12-26 | Initial setup |

---

## 📞 সাহায্য প্রয়োজন?

1. [Troubleshooting Guide](05_Troubleshooting/README.md) দেখুন
2. [Configuration Vault](07_Configuration_Secrets/README.md) চেক করুন  
3. GitHub Issue তৈরি করুন

---

## 🎉 Next Steps

1. ✅ Configuration documentation complete
2. ✅ Category structure ready
3. 🔄 **Now**: Start multi-vendor development
   - User authentication
   - Vendor management
   - Product system
   - Order processing

---

**Last Updated**: December 26, 2025, 12:15 PM  
**Maintained By**: Antigravity Development Team  
**Repository**: [github.com/mahmudulhassan-dev/amanamart-ecommerce](https://github.com/mahmudulhassan-dev/amanamart-ecommerce)

*সব configuration এবং notes এখানে সুসংগঠিত ভাবে রাখা আছে* ✨
