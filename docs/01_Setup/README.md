# 🐳 Docker Installation এবং Setup Guide

> **সম্পূর্ণ স্বয়ংক্রিয় ইনস্টলেশন এবং configuration**

---

## 📋 System Requirements

- ✅ Docker Desktop installed
- ✅ Minimum 8GB RAM
- ✅ 10GB free disk space
- ✅ Windows 10/11 or Linux/Mac

---

## 🚀 Quick Start (3 Steps)

### Step 1: Clone Project
```bash
cd g:\laragon\www\Antigravity\devamanamart-ecommerce
```

### Step 2: Start Services
```bash
docker-compose up -d
```

### Step 3: Access Applications
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **pgAdmin**: http://localhost:8081
- **Database**: localhost:5432
- **Redis**: localhost:6379

---

## 🎯 Services Overview

### 1. Database (PostgreSQL) 
```yaml
Container: amana_db
Port: 5432
Database: amanamart
Username: postgres
Password: root
```

**Access via CLI**:
```bash
docker exec -it amana_db psql -U postgres -d amanamart
```

### 2. Cache (Redis)
```yaml
Container: amana_redis
Port: 6379
Password: (empty)
```

**Access via CLI**:
```bash
docker exec -it amana_redis redis-cli
```

### 3. Database UI (pgAdmin)
```yaml
Container: amana_pgadmin
Port: 8081
Login: admin@amana.com
Password: root
```

**Access**: http://localhost:8081

### 4. Backend (Spring Boot)
```yaml
Container: amana_backend
Port: 8080
Context Path: /api
Health Check: /api/actuator/health
```

**Test API**:
```bash
curl http://localhost:8080/api/actuator/health
```

### 5. Frontend (React + Vite)
```yaml
Container: amana_frontend  
Port: 5173
```

**Access**: http://localhost:5173

---

## 📊 Installation Steps

### প্রথমবার সেটআপ

```bash
# 1. সব পুরনো containers মুছে ফেলুন
docker-compose down -v

# 2. Fresh installation শুরু করুন
docker-compose up -d --build

# 3. Logs দেখুন
docker-compose logs -f

# 4.Status check করুন
docker-compose ps
```

### Partial Start (শুধু Database এবং Cache)

```bash
# শুধু infrastructure services 
docker-compose up -d postgresdb redis pgadmin

# Status verify করুন
docker ps
```

---

## 🔧 Configuration Files

### Docker Compose
- `docker-compose.yml` - Main configuration
- `Dockerfile` - Backend build instructions  
- `frontend/Dockerfile` - Frontend build instructions
- `frontend/nginx.conf` - nginx configuration

### Application Settings
- `backend/src/main/resources/application.properties` - Backend config
- `frontend/.env` - Frontend environment variables

---

## ⚙️ Advanced Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres db
```

### Restart Service
```bash
# Single service
docker-compose restart backend

# All services
docker-compose restart
```

### Rebuild Service
```bash
# Backend only
docker-compose up -d --build backend

# Frontend only  
docker-compose up -d --build frontend

# Everything
docker-compose up -d --build
```

### Stop Services
```bash
# Stop all
docker-compose stop

# Stop specific
docker-compose stop backend

# Stop and remove
docker-compose down

# Stop and remove with volumes (clean slate)
docker-compose down -v
```

---

## 🩺 Health Checks

### Check Service Status
```bash
# All containers
docker-compose ps

# Docker stats
docker stats
```

### Test Backend Health
```bash
curl http://localhost:8080/api/actuator/health
```

Expected Response:
```json
{
  "status": "UP"
}
```

### Test Frontend
```bash
curl http://localhost:5173
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Problem**: `Error: port 5432 is already allocated`

**Solution**:
```bash
# Windows - Check and kill process
netstat -ano | findstr :5432
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
ports:
  - "5433:5432"  # Changed host port
```

### Container Fails to Start

**Problem**: Backend container exits immediately

**Solution**:
```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose up -d --build backend
```

### Database Connection Refused

**Problem**: Backend can't connect to database

**Solution**:
1. Check if PostgreSQL is running:
   ```bash
   docker ps | grep postgres
   ```

2. Wait 30 seconds for database to initialize

3. Restart backend:
   ```bash
   docker-compose restart backend
   ```

### Permission Issues

**Solution**:
```bash
# Run as administrator (Windows)
# Or use sudo (Linux/Mac)
```

---

## 📈 Performance Optimization

### Resource Limits

Edit `docker-compose.yml`:
```yaml
services:
  postgresdb:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          memory: 512M
```

### Build Cache

```bash
# Clear build cache
docker builder prune

# Full system cleanup
docker system prune -a
```

---

## 🔐 Security Best Practices

### Change Default Passwords

1. Edit `.env` file:
```env
DB_PASSWORD=your-strong-password
PGADMIN_PASSWORD=admin-password
```

2. Restart services:
```bash
docker-compose down
docker-compose up -d
```

### Network Isolation

All services are on `amana-network` - isolated from other Docker networks.

---

## 📊 Monitoring

### View Resource Usage
```bash
docker stats
```

### Database Size
```sql
SELECT pg_size_pretty(pg_database_size('amanamart'));
```

### Redis Memory
```bash
docker exec -it amana_redis redis-cli INFO memory
```

---

## 🔄 Backup & Restore

### Database Backup
```bash
# Backup
docker exec amana_db pg_dump -U postgres amanamart > backup.sql

# Restore
docker exec -i amana_db psql -U postgres amanamart < backup.sql
```

### Redis Backup
```bash
# Redis auto-saves to /data/dump.rdb in container
# Volume: ./data/redis:/data
```

---

## ✅ Verification Checklist

- [ ] Docker Desktop running
- [ ] All containers started (`docker ps`)
- [ ] PostgreSQL accessible (port 5432)
- [ ] Redis accessible (port 6379)
- [ ] pgAdmin accessible (http://localhost:8081)
- [ ] Backend healthy (http://localhost:8080/api/actuator/health)
- [ ] Frontend loading (http://localhost:5173)

---

## 🎯 Next Steps After Installation

1. ✅ Verify all services running
2. 📊 Access pgAdmin and create database connection
3. 🧪 Test backend API endpoints
4. 🎨 Check frontend loading
5. 📝 Start development!

---

**Installation Time**: 5-10 minutes (first time)  
**Next Time**: 1-2 minutes  

**Need Help?** Check logs: `docker-compose logs -f`

**Last Updated**: December 26, 2025
