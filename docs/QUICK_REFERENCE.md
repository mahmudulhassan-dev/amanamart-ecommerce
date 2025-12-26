# 📋 Quick Reference Card - AmanaMart

> **এই পেজটি প্রিন্ট করে রাখুন! দৈনিক কাজের জন্য দ্রুত রেফারেন্স**

---

## 🚀 দ্রুত শুরু (Quick Start)

### প্রথমবার সেটআপ:
```bash
# ১. প্রজেক্ট ফোল্ডারে যান
cd g:\laragon\www\Antigravity\devamanamart-ecommerce

# ২. Docker চালু করুন
docker-compose up -d

# ৩. Status চেক করুন
docker-compose ps
```

### প্রতিদিন:
```bash
# শুরু করুন
docker-compose start

# বন্ধ করুন
docker-compose stop

# পুনরায় চালু করুন
docker-compose restart
```

---

## 🌐 Important URLs

| সার্ভিস | URL | ব্যবহার |
|---------|-----|----------|
| 🎨 **Frontend** | http://localhost:5173 | ওয়েবসাইট UI |
| ☕ **Backend API** | http://localhost:8080 | API Endpoints |
| 📦 **Products API** | http://localhost:8080/api/products | পণ্য তালিকা |
| 🐘 **PostgreSQL** | localhost:5432 | Database |
| 🔴 **Redis** | localhost:6379 | Cache |

---

## 🌿 Git Commands (Daily Use)

### প্রতিদিন কাজের ফ্লো:
```bash
# ১. Status দেখুন (কী পরিবর্তন হয়েছে)
git status

# ২. সব পরিবর্তন যোগ করুন
git add .

# ৩. Commit করুন
git commit -m "আপনার বার্তা এখানে লিখুন"

# ৪. GitHub এ পাঠান
git push
```

### অন্যান্য প্রয়োজনীয় কমান্ড:
```bash
# GitHub থেকে নতুন পরিবর্তন নামান
git pull

# Commit ইতিহাস দেখুন
git log --oneline

# কোন ফাইল পরিবর্তন হয়েছে দেখুন
git diff

# শেষ commit বাতিল করুন (সাবধান!)
git reset --soft HEAD~1
```

---

## 🐳 Docker Commands

### সার্ভিস নিয়ন্ত্রণ:
```bash
# সব সার্ভিস চালু করুন
docker-compose up -d

# সব সার্ভিস বন্ধ করুন
docker-compose down

# নির্দিষ্ট সার্ভিস পুনরায় চালু
docker-compose restart backend

# লগ দেখুন
docker-compose logs -f

# নির্দিষ্ট সার্ভিসের লগ
docker-compose logs -f frontend
```

### Status এবং Debugging:
```bash
# চলমান সার্ভিস দেখুন
docker-compose ps

# Resource ব্যবহার দেখুন
docker stats

# Container এর ভিতরে ঢুকুন
docker-compose exec backend sh
```

### পরিষ্কার করা:
```bash
# সব বন্ধ করুন এবং Volume মুছুন
docker-compose down -v

# ব্যবহার হয়নি এমন সব মুছুন
docker system prune -a
```

---

## ☕ Backend (Spring Boot) Commands

```bash
# Backend ফোল্ডারে যান
cd backend

# Build করুন
./mvnw clean install

# Test চালান
./mvnw test

# Run করুন (Docker ছাড়া)
./mvnw spring-boot:run
```

---

## ⚛️ Frontend (React) Commands

```bash
# Frontend ফোল্ডারে যান
cd frontend

# Dependencies ইনস্টল করুন
npm install

# Development server চালান
npm run dev

# Production build তৈরি করুন
npm run build

# Build preview দেখুন
npm run preview
```

---

## 🐘 PostgreSQL Commands

### Database এ কানেক্ট করুন:
```bash
# Docker container এ ঢুকুন
docker-compose exec postgresdb psql -U postgres -d amanamart
```

### প্রয়োজনীয় SQL কমান্ড:
```sql
-- সব টেবিল দেখুন
\dt

-- একটি টেবিলের structure দেখুন
\d products

-- সব পণ্য দেখুন
SELECT * FROM products;

-- নতুন পণ্য যোগ করুন
INSERT INTO products (name, price, description) 
VALUES ('iPhone 15', 999.99, 'Latest iPhone');

-- Database থেকে বেরিয়ে যান
\q
```

---

## 🔴 Redis Commands

### Redis CLI তে ঢুকুন:
```bash
docker-compose exec redis redis-cli
```

### প্রয়োজনীয় Redis কমান্ড:
```bash
# সব key দেখুন
KEYS *

# একটি key এর value দেখুন
GET product:123

# Cache পরিষ্কার করুন
FLUSHALL

# Redis থেকে বেরিয়ে যান
exit
```

---

## 📊 API Endpoints Quick Reference

### Products:
```
GET    /api/products              → সব পণ্য
GET    /api/products/{id}         → একটি পণ্য
POST   /api/products              → নতুন পণ্য
PUT    /api/products/{id}         → আপডেট
DELETE /api/products/{id}         → মুছে ফেলা
GET    /api/products/search?q=... → সার্চ
```

### Categories:
```
GET    /api/categories            → সব ক্যাটাগরি
POST   /api/categories            → নতুন ক্যাটাগরি
```

### cURL Examples:
```bash
# সব পণ্য দেখুন
curl http://localhost:8080/api/products

# একটি নির্দিষ্ট পণ্য
curl http://localhost:8080/api/products/1

# নতুন পণ্য যোগ করুন
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":99.99}'
```

---

## 🛠️ সাধারণ সমস্যা এবং সমাধান

### ❌ Port already in use:
```bash
# কোন process port ব্যবহার করছে দেখুন
netstat -ano | findstr :8080

# Process kill করুন (Windows)
taskkill /PID <PID_NUMBER> /F
```

### ❌ Docker not starting:
```bash
# Docker restart করুন
docker-compose restart

# সব কিছু নতুন করে শুরু
docker-compose down
docker-compose up -d --build
```

### ❌ Database connection failed:
```bash
# Database logs দেখুন
docker-compose logs postgresdb

# Database restart করুন
docker-compose restart postgresdb
```

### ❌ Frontend not loading:
```bash
# Frontend logs দেখুন
docker-compose logs frontend

# Frontend rebuild করুন
docker-compose up -d --build frontend
```

---

## 📁 গুরুত্বপূর্ণ ফাইল পাথ

```
🏠 প্রজেক্ট রুট:
g:\laragon\www\Antigravity\devamanamart-ecommerce

📚 ডকুমেন্টেশন:
g:\laragon\www\Antigravity\devamanamart-ecommerce\docs

☕ Backend কোড:
g:\laragon\www\Antigravity\devamanamart-ecommerce\backend\src

⚛️ Frontend কোড:
g:\laragon\www\Antigravity\devamanamart-ecommerce\frontend\src

🐳 Docker config:
g:\laragon\www\Antigravity\devamanamart-ecommerce\docker-compose.yml
```

---

## 🔐 Default Credentials

| সার্ভিস | Username | Password | Database |
|---------|----------|----------|----------|
| PostgreSQL | `postgres` | `root` | `amanamart` |
| Redis | - | (none) | - |

> ⚠️ **Production এ অবশ্যই পরিবর্তন করুন!**

---

## ✅ Pre-Deployment Checklist

```
প্রোডাকশনে পাঠানোর আগে চেক করুন:

□ সব পাসওয়ার্ড পরিবর্তন করেছেন
□ .env ফাইল .gitignore এ আছে
□ সব test pass হচ্ছে
□ Production build তৈরি করেছেন
□ Database backup নিয়েছেন
□ Error logging সেটআপ করেছেন
□ HTTPS সেটআপ করেছেন
```

---

## 🆘 জরুরি যোগাযোগ

### ডকুমেন্টেশন লিংক:
- [📚 Master Index](docs/README.md)
- [🌿 Git Guide](docs/00_Git_Integration/README.md)
- [🐳 Docker Services](docs/06_Docker/)
- [🛠️ Troubleshooting](docs/05_Troubleshooting/README.md)

### অনলাইন রিসোর্স:
- **Git**: https://git-scm.com/doc
- **Docker**: https://docs.docker.com/
- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev/

---

## 📊 পারফরমেন্স মনিটরিং

```bash
# Docker resource usage
docker stats

# Database size
docker-compose exec postgresdb \
  psql -U postgres -d amanamart -c \
  "SELECT pg_size_pretty(pg_database_size('amanamart'));"

# Redis memory usage
docker-compose exec redis redis-cli INFO memory
```

---

## 🎯 কীবোর্ড শর্টকাট (Terminal)

| শর্টকাট | কাজ |
|---------|------|
| `Ctrl + C` | চলমান প্রসেস বন্ধ করুন |
| `Ctrl + L` | Terminal পরিষ্কার করুন |
| `↑` (উপরের তীর) | পূর্ববর্তী কমান্ড |
| `Tab` | Auto-complete |
| `Ctrl + R` | কমান্ড সার্চ |

---

## 🎨 Commit Message Templates

```bash
# ভালো commit message এর উদাহরণ:

git commit -m "feat: Added shopping cart functionality"
git commit -m "fix: Fixed login button not responding on mobile"
git commit -m "docs: Updated API documentation"
git commit -m "style: Improved product card design"
git commit -m "refactor: Optimized database queries"
git commit -m "test: Added unit tests for payment module"
git commit -m "chore: Updated dependencies"
```

**শ্রেণীবিভাগ:**
- `feat:` নতুন feature
- `fix:` bug fix
- `docs:` documentation
- `style:` styling পরিবর্তন
- `refactor:` code refactoring
- `test:` testing
- `chore:` অন্যান্য কাজ

---

## 🔄 ব্যাকআপ কমান্ড

### Database Backup:
```bash
# Backup তৈরি
docker-compose exec postgresdb pg_dump -U postgres amanamart > backup.sql

# Backup restore করুন
cat backup.sql | docker-compose exec -T postgresdb psql -U postgres amanamart
```

### পুরো প্রজেক্ট Backup:
```bash
# Git push করুন (সবচেয়ে ভালো উপায়)
git add .
git commit -m "Backup before major changes"
git push

# অথবা ZIP তৈরি করুন
tar -czf amanamart-backup-$(date +%Y%m%d).tar.gz .
```

---

## 📱 Contact & Support

**Developer**: Antigravity Team  
**Email**: support@amanamart.com  
**Documentation**: [Full Docs](docs/README.md)  

---

**শেষ আপডেট**: ২৬ ডিসেম্বর, ২০২৫

---

**💡 টিপস**: এই পেজটি প্রিন্ট করে আপনার ডেস্কে রাখুন। দৈনিক কাজে দ্রুত রেফারেন্সের জন্য খুবই কাজে লাগবে!

---

*তৈরি করেছেন ❤️ দিয়ে - Antigravity*
