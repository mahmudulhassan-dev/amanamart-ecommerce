# 🐘 PostgreSQL Database Service - সম্পূর্ণ নির্দেশিকা

> **Primary Database** - সবচেয়ে শক্তিশালী Open Source Database

---

## 📋 Service Overview

### Basic Information
```yaml
Container Name: amana_db
Image: postgres:16-alpine
Port: 5432
Database: amanamart
Username: postgres
Password: root
Volume: postgres_data:/var/lib/postgresql/data
Network: amana-network
```

---

## 🔧 Configuration Details

### Docker Compose Configuration

```yaml
postgresdb:
  image: postgres:16-alpine
  container_name: amana_db
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: root
    POSTGRES_DB: amanamart
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
  networks:
    - amana-network
  restart: always
```

### Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `POSTGRES_USER` | postgres | Database admin username |
| `POSTGRES_PASSWORD` | root | Database admin password |
| `POSTGRES_DB` | amanamart | Default database name |

---

## 🚀 Usage Commands

### Start Service

```bash
# Individual start
docker-compose up -d postgresdb

# With dependencies
docker-compose up -d postgresdb redis
```

### Stop Service

```bash
# Stop only
docker-compose stop postgresdb

# Stop and remove
docker-compose down postgresdb
```

### Restart Service

```bash
docker-compose restart postgresdb
```

---

## 🔌 Access Methods

### Method 1: Docker Exec (psql)

```bash
# Access PostgreSQL CLI
docker exec -it amana_db psql -U postgres -d amanamart

# Common psql commands
\l              # List databases
\dt             # List tables
\d table_name   # Describe table
\q              # Quit
```

### Method 2: pgAdmin UI

```
URL: http://localhost:8081
Email: admin@amana.com
Password: root

Connection Details:
- Host: postgresdb
- Port: 5432
- Username: postgres
- Password: root
- Database: amanamart
```

### Method 3: External Tools (DBeaver, DataGrip)

```
Host: localhost
Port: 5432
Database: amanamart
Username: postgres
Password: root
```

---

## 📊 Database Schema

### Tables (Current)

```sql
-- Products table (upcoming)
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table (upcoming)
CREATE TABLE vendors (
    id BIGSERIAL PRIMARY KEY,
    shop_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠️ Common Operations

### Check Database Size

```sql
SELECT pg_size_pretty(pg_database_size('amanamart'));
```

### List All Tables

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

### Count Rows in Table

```sql
SELECT COUNT(*) FROM products;
```

### Create Backup

```bash
# Dump database
docker exec amana_db pg_dump -U postgres amanamart > backup_$(date +%Y%m%d).sql

# Dump with compression
docker exec amana_db pg_dump -U postgres amanamart | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restore Backup

```bash
# From SQL file
docker exec -i amana_db psql -U postgres amanamart < backup.sql

# From compressed file
gunzip < backup.sql.gz | docker exec -i amana_db psql -U postgres amanamart
```

---

## 📈 Performance Tuning

### Connection Pooling (Backend)

```properties
# In application.properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### Check Current Connections

```sql
SELECT count(*) FROM pg_stat_activity;
```

### View Active Queries

```sql
SELECT pid, usename, state, query 
FROM pg_stat_activity 
WHERE state = 'active';
```

### Kill Idle Connections

```sql
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' AND state_change < now() - interval '5 minutes';
```

---

## 🔐 Security Configuration

### Change Password

```bash
docker exec -it amana_db psql -U postgres -c "ALTER USER postgres PASSWORD 'new_password';"
```

### Create New User

```sql
-- Read-only user
CREATE USER readonly WITH PASSWORD 'readpass';
GRANT CONNECT ON DATABASE amanamart TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Application user
CREATE USER appuser WITH PASSWORD 'apppass';
GRANT ALL PRIVILEGES ON DATABASE amanamart TO appuser;
```

---

## 🩺 Health Monitoring

### Check if Database is Ready

```bash
docker exec amana_db pg_isready -U postgres
```

### View Logs

```bash
# Real-time logs
docker logs -f amana_db

# Last 100 lines
docker logs --tail 100 amana_db
```

### Database Stats

```sql
-- Database size
SELECT pg_size_pretty(pg_database_size('amanamart'));

-- Table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🐛 Troubleshooting

### Issue: Connection Refused

**Symptoms**: Backend can't connect to database

**Solutions**:
```bash
# 1. Check if container is running
docker ps | grep amana_db

# 2. Check logs for errors
docker logs amana_db

# 3. Restart database
docker-compose restart postgresdb

# 4. Verify network
docker network inspect devamanamart-ecommerce_amana-network
```

### Issue: Slow Queries

**Solutions**:
```sql
-- Enable query logging
ALTER DATABASE amanamart SET log_statement = 'all';

-- Check slow queries
SELECT * FROM pg_stat_statements 
ORDER BY total_time DESC LIMIT 10;
```

### Issue: Disk Space Full

**Solutions**:
```bash
# Check volume size
docker system df -v

# Clean old data
docker exec -it amana_db psql -U postgres -c "VACUUM FULL;"

# Remove unused volumes
docker volume prune
```

---

## 📊 Monitoring Metrics

### Key Metrics to Watch

| Metric | Command | Healthy Range |
|--------|---------|---------------|
| Connections | `SELECT count(*) FROM pg_stat_activity;` | < 100 |
| Database Size | `SELECT pg_size_pretty(pg_database_size('amanamart'));` | < 10GB |
| Cache Hit Ratio | `SELECT (blks_hit::float/(blks_read+blks_hit)) FROM pg_stat_database WHERE datname='amanamart';` | > 0.99 |

---

## 🔄 Maintenance Tasks

### Daily Tasks
```bash
# Check database health
docker exec amana_db pg_isready -U postgres
```

### Weekly Tasks
```sql
-- Analyze tables
ANALYZE;

-- Vacuum tables
VACUUM;
```

### Monthly Tasks
```bash
# Full backup
docker exec amana_db pg_dump -U postgres amanamart > monthly_backup_$(date +%Y%m).sql

# Check and optimize
docker exec -it amana_db psql -U postgres -c "VACUUM FULL ANALYZE;"
```

---

## 📝 Configuration Files

### Location in Container
```
/var/lib/postgresql/data/postgresql.conf
/var/lib/postgresql/data/pg_hba.conf
```

### Modify Configuration
```bash
# Access container
docker exec -it amana_db sh

# Edit config (if vi available)
vi /var/lib/postgresql/data/postgresql.conf
```

---

## ✅ Verification Checklist

- [ ] Container running (`docker ps`)
- [ ] Port 5432 accessible
- [ ] Can connect via psql
- [ ] Can connect via pgAdmin
- [ ] Database 'amanamart' exists
- [ ] No error logs
- [ ] Backup working
- [ ] Connection pooling configured

---

## 🎯 Best Practices

1. **Regular Backups**: Daily automated backups
2. **Monitor Connections**: Keep track of active connections
3. **Optimize Queries**: Use indexes and EXPLAIN
4. **Update Regularly**: Keep PostgreSQL updated
5. **Secure Access**: Use strong passwords
6. **Resource Limits**: Set Docker resource constraints
7. **Log Rotation**: Prevent log files from filling disk

---

## 📚 Useful SQL Queries

### Check Table Sizes
```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS data_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) AS external_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Find Duplicate Indexes
```sql
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

---

**Service Status**: ✅ Running  
**Last Updated**: December 26, 2025  
**Version**: PostgreSQL 16-alpine  
**Documentation By**: Antigravity Team
