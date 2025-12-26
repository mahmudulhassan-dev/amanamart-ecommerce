# 🐳 Docker Services - সূচিপত্র

> **সব Docker Service এর সম্পূর্ণ ডকুমেন্টেশন এক জায়গায়**

---

## 📋 Available Services

### Infrastructure Services (Running ✅)

1. **[PostgreSQL Database](01_PostgreSQL_Service.md)** 🐘
   - Primary database
   - Port: 5432  
   - Container: `amana_db`
   - Status: ✅ Running

2. **[Redis Cache](02_Redis_Service.md)** 🔴
   - In-memory caching
   - Port: 6379
   - Container: `amana_redis`
   - Status: ✅ Running

3. **[pgAdmin UI](03_pgAdmin_Service.md)** 🎯
   - Database management
   - Port: 8081
   - Container: `amana_pgadmin`
   - Status: ✅ Running

### Application Services (Pending ⏳)

4. **[Backend API](04_Backend_Service.md)** ☕
   - Spring Boot REST API
   - Port: 8080
   - Container: `amana_backend`
   - Status: ⏳ Not built yet

5. **[Frontend App](05_Frontend_Service.md)** ⚛️
   - React + Vite + nginx
   - Port: 5173
   - Container: `amana_frontend`
   - Status: ⏳ Not built yet

---

## 🗺️ Service Architecture

```
┌─────────────────────────────────────────────────┐
│            Frontend (React + nginx)             │
│         http://localhost:5173                   │
│         Container: amana_frontend               │
└──────────────────┬──────────────────────────────┘
                   │ API Calls
                   ↓
┌─────────────────────────────────────────────────┐
│        Backend (Spring Boot REST API)           │
│         http://localhost:8080/api               │
│         Container: amana_backend                │
└──────┬─────────────┬────────────────────────────┘
       │             │
       │             └──────→ Redis Cache
       │                      Port: 6379
       │                      amana_redis
       ↓
  PostgreSQL Database
  Port: 5432
  amana_db
       ↑
       │ Managed by
       │
  pgAdmin UI
  http://localhost:8081
  amana_pgadmin
```

---

## 📊 Service Comparison

| Service | Type | Port | Status | CPU | Memory |
|---------|------|------|--------|-----|--------|
| PostgreSQL | Database | 5432 | ✅ Running | Low | ~200MB |
| Redis | Cache | 6379 | ✅ Running | Very Low | ~50MB |
| pgAdmin | UI Tool | 8081 | ✅ Running | Low | ~150MB |
| Backend | API | 8080 | ⏳ Pending | Medium | ~500MB |
| Frontend | Web App | 5173 | ⏳ Pending | Low | ~100MB |

---

## 🚀 Quick Commands

### Start All Services

```bash
docker-compose up -d
```

### Start Specific Services

```bash
# Infrastructure only
docker-compose up -d postgresdb redis pgadmin

# Application only (after build)
docker-compose up -d backend frontend
```

### Stop All Services

```bash
docker-compose down
```

### View Status

```bash
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

---

## 📁 Service Documentation

### 1. [PostgreSQL Database](01_PostgreSQL_Service.md)

**What's Inside**:
- Complete configuration
- Access methods (psql, pgAdmin, external tools)
- SQL operations and queries
- Backup & restore procedures
- Performance tuning
- Troubleshooting guide

**Key Features**:
- ACID compliant
- Connection pooling
- Automatic backups
- Health monitoring

---

### 2. [Redis Cache](02_Redis_Service.md)

**What's Inside**:
- Caching strategy explained
- Redis CLI commands
- Cache patterns (read-through, write-through)
- Performance monitoring
- Memory management
- Best practices

**Key Features**:
- 100x faster than database
- Session management
- Reduces database load by 80%
- TTL-based expiration

---

### 3. [pgAdmin](03_pgAdmin_Service.md)

**What's Inside**:
- UI walkthrough
- Database connection setup
- Query tool usage
- Import/export data
- Visual schema designer
- Monitoring dashboards

**Key Features**:
- Web-based interface
- No installation needed
- Visual query builder
- Backup/restore tools

---

### 4. Backend Service (Coming Soon)

**Will Include**:
- Spring Boot configuration
- API endpoints documentation
- Business logic explanation
- Security setup (JWT)
- Integration with database & cache

---

### 5. Frontend Service (Coming Soon)

**Will Include**:
- React component structure
- Routing setup
- State management
- API integration
- nginx optimization

---

## 🔗 Service Dependencies

```
Frontend → Backend → PostgreSQL
                  → Redis
    
pgAdmin → PostgreSQL
```

**Startup Order**:
1. PostgreSQL (database must be first)
2. Redis (independent, can start anytime)
3. Backend (needs database & redis)
4. Frontend (needs backend)
5. pgAdmin (needs postgresql, optional)

---

## 🌐 Network Configuration

### Docker Network: `amana-network`

All services are on the same network for communication:

```yaml
networks:
  amana-network:
    driver: bridge
```

**Service Communication**:
- Backend connects to database using: `postgresdb:5432`
- Backend connects to redis using: `redis:6379`
- Frontend proxies to backend: `backend:8080`

---

## 📊 Monitoring All Services

### Health Check Commands

```bash
# PostgreSQL
docker exec amana_db pg_isready -U postgres

# Redis
docker exec amana_redis redis-cli ping

# Backend (when running)
curl http://localhost:8080/api/actuator/health

# Frontend (when running)
curl http://localhost:5173
```

### Resource Usage

```bash
# View all containers stats
docker stats

# Specific service
docker stats amana_db
```

---

## 🔧 Common Operations

### Rebuild Service

```bash
# Single service
docker-compose up -d --build backend

# All services
docker-compose up -d --build
```

### Restart Services

```bash
# All
docker-compose restart

# Specific
docker-compose restart backend redis
```

### Clean Start

```bash
# Remove everything and start fresh
docker-compose down -v
docker-compose up -d --build
```

---

## 🐛 Multi-Service Troubleshooting

### All Services Down

```bash
# Check Docker Desktop running
docker version

# Check network
docker network ls

# Restart Docker Desktop
# Then: docker-compose up -d
```

### Services Can't Communicate

```bash
# Verify network
docker network inspect devamanamart-ecommerce_amana-network

# Check service names resolving
docker exec amana_backend ping postgresdb
```

### Port Conflicts

```bash
# Check what's using ports
netstat -ano | findstr :5432
netstat -ano | findstr :8080

# Change ports in docker-compose.yml
```

---

## 📝 Configuration Summary

### Environment Variables

| Service | Key Variables |
|---------|---------------|
| PostgreSQL | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` |
| Redis | None (default config) |
| pgAdmin | `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD` |
| Backend | `SPRING_DATASOURCE_URL`, `SPRING_DATA_REDIS_HOST` |
| Frontend | `VITE_API_BASE_URL` |

### Volumes (Data Persistence)

```yaml
volumes:
  postgres_data:    # Database files
  # Add more as needed
```

---

## ✅ Service Checklist

### Infrastructure Setup
- [x] PostgreSQL running
- [x] Redis running
- [x] pgAdmin accessible
- [x] Network created
- [x] Volumes created

### Application Setup
- [ ] Backend built
- [ ] Backend running
- [ ] Frontend built
- [ ] Frontend running
- [ ] All health checks passing

---

## 🎯 Next Steps

1. Build backend service
2. Build frontend service
3. Test end-to-end flow
4. Configure production settings
5. Set up monitoring
6. Enable HTTPS

---

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

---

**Total Services**: 5  
**Running**: 3/5 (60%)  
**Documentation Status**: ✅ Complete for running services  
**Last Updated**: December 26, 2025

**Created By**: Antigravity Team

*প্রতিটি service এর সম্পূর্ণ documentation এখন আলাদা ফাইলে সংগঠিত! 🎉*
