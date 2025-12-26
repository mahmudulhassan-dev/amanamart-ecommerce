# 🎯 pgAdmin Service - Database Management UI

> **Web-based PostgreSQL Administration Tool** - Database ব্যবস্থাপনার জন্য সুবিধাজনক UI

---

## 📋 Service Overview

### Basic Information
```yaml
Container Name: amana_pgadmin
Image: dpage/pgadmin4
Port: 8081 (mapped to 80 in container)
Login Email: admin@amana.com
Password: root
Network: amana-network
```

---

## 🔧 Configuration Details

### Docker Compose Configuration

```yaml
pgadmin:
  image: dpage/pgadmin4
  container_name: amana_pgadmin
  environment:
    PGADMIN_DEFAULT_EMAIL: admin@amana.com
    PGADMIN_DEFAULT_PASSWORD: root
  ports:
    - "8081:80"
  depends_on:
    - postgresdb
  networks:
    - amana-network
```

### Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `PGADMIN_DEFAULT_EMAIL` | admin@amana.com | Login email |
| `PGADMIN_DEFAULT_PASSWORD` | root | Login password |

---

## 🚀 Quick Start

### Access pgAdmin

1. **Open Browser**: http://localhost:8081
2. **Login with**:
   - Email: `admin@amana.com`
   - Password: `root`

### First Time Setup

#### Register PostgreSQL Server

1. Click "Add New Server"
2. **General Tab**:
   - Name: `AmanaMart Database`
3. **Connection Tab**:
   - Host: `postgresdb` (container name)
   - Port: `5432`
   - Maintenance database: `amanamart`
   - Username: `postgres`
   - Password: `root`
4. **Save** ✅

---

## 📊 Features এবং Capabilities

### 1. Database Browser
- View all databases
- Explore tables, views, functions
- See table schemas
- Browse data

### 2. Query Tool
```sql
-- Run any SQL query
SELECT * FROM products;

-- Create tables
CREATE TABLE test (id SERIAL PRIMARY KEY);

-- Analyze performance
EXPLAIN ANALYZE SELECT * FROM products WHERE price > 100;
```

### 3. Visual Schema Designer
- Create tables visually
- Define relationships
- Set constraints
- Generate SQL

### 4. Data Import/Export
- Import CSV files
- Export query results
- Backup databases
- Restore from backups

### 5. User Management
- Create database users
- Assign permissions
- Manage roles

---

## 🛠️ Common Tasks

### View Table Data

1. Navigate: Servers → AmanaMart → Databases → amanamart → Schemas → public → Tables
2. Right-click table → View/Edit Data → All Rows

### Run SQL Query

1. Right-click database → Query Tool
2. Write your SQL
3. Click ▶️ (Execute)
4. View results below

### Create New Table

```sql
CREATE TABLE vendors (
    id BIGSERIAL PRIMARY KEY,
    shop_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Export Data

1. Right-click table → Import/Export
2. Choose "Export"
3. Select format (CSV, JSON, etc.)
4. Click OK

---

## 📈 Database Monitoring

### View Database Size

```sql
SELECT 
    pg_database.datname,
    pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database
ORDER BY pg_database_size(pg_database.datname) DESC;
```

### Active Connections

```sql
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    state,
    query
FROM pg_stat_activity
WHERE datname = 'amanamart';
```

### Table Sizes

```sql
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🐛 Troubleshooting

### Issue: Can't Access pgAdmin

**Solution**:
```bash
# 1. Check if container running
docker ps | grep pgadmin

# 2. Check logs
docker logs amana_pgadmin

# 3. Restart service
docker-compose restart pgadmin

# 4. Access: http://localhost:8081
```

### Issue: Can't Connect to PostgreSQL

**Problem**: "Could not connect to server"

**Solutions**:
1. Verify PostgreSQL is running:
   ```bash
   docker ps | grep postgres
   ```

2. Use correct host name: `postgresdb` (not `localhost`)

3. Check network:
   ```bash
   docker network inspect devamanamart-ecommerce_amana-network
   ```

4. Verify credentials:
   - Username: `postgres`
   - Password: `root`
   - Database: `amanamart`

### Issue: Forgot pgAdmin Password

**Solution**:
```bash
# Recreate container
docker-compose down pgadmin
docker-compose up -d pgadmin

# Login with default credentials
# Email: admin@amana.com
# Password: root
```

---

## 🔐 Security Best Practices

### Change Default Password

1. Login to pgAdmin
2. Click User icon (top-right) → Change Password
3. Enter new password
4. Update docker-compose.yml:
   ```yaml
   PGADMIN_DEFAULT_PASSWORD: your_new_password
   ```

### Create Additional Users

1. Click User icon → Preferences → Users
2. Add new user
3. Set permissions

---

## 📊 Advanced Features

### Dashboard Widgets

- **Server Activity**: Real-time monitoring
- **Database Statistics**: Size, connections
- **Graph Visualizer**: Query execution plans
- **Query History**: Track all executed queries

### Backup & Restore

#### Create Backup

1. Right-click database → Backup
2. Choose format (Custom, Tar, Plain)
3. Select file location
4. Click Backup

#### Restore Backup

1. Right-click database → Restore
2. Select backup file
3. Configure options
4. Click Restore

---

## 🎨 UI Customization

### Change Theme

1. File → Preferences → Miscellaneous → Themes
2. Choose theme (Light/Dark)
3. Refresh browser

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `F5` | Execute query |
| `Alt + Shift + Q` | Open Query Tool |
| `Ctrl + Space` | Auto-complete |
| `Ctrl + /` | Comment/uncomment |

---

## 📝 Configuration Files

### Persistent Settings

```yaml
# Add volume for settings persistence
pgadmin:
  volumes:
    - pgadmin_data:/var/lib/pgadmin
```

### Custom Configuration

```yaml
# Set custom server mode
environment:
  PGADMIN_CONFIG_SERVER_MODE: 'False'  # Desktop mode
  PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED: 'False'
```

---

## ✅ Verification Checklist

- [ ] Service running (`docker ps`)
- [ ] Accessible at http://localhost:8081
- [ ] Can login with credentials
- [ ] PostgreSQL server registered
- [ ] Can execute queries
- [ ] Can view table data
- [ ] Backup/restore working

---

## 🎯 Best Practices

1. **Regular Backups**: Schedule weekly backups
2. **Monitor Activity**: Check active connections regularly
3. **Optimize Queries**: Use EXPLAIN ANALYZE
4. **Secure Access**: Change default password
5. **Save Queries**: Use query history feature
6. **Document Changes**: Add comments to queries
7. **Test First**: Use transactions for data changes

---

## 📊 Useful Queries Collection

### Check Database Health

```sql
-- Database size
SELECT pg_size_pretty(pg_database_size('amanamart'));

-- Connection count
SELECT count(*) FROM pg_stat_activity;

-- Cache hit ratio (should be > 99%)
SELECT 
    sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS cache_hit_ratio
FROM pg_statio_user_tables;
```

### Performance Analysis

```sql
-- Slow queries
SELECT * FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

-- Unused indexes
SELECT * FROM pg_stat_user_indexes 
WHERE idx_scan = 0;

-- Table bloat
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🔄 Maintenance Tasks

### Weekly Tasks

1. **Backup Database**:
   - Right-click → Backup → Execute

2. **Check Table Sizes**:
   ```sql
   SELECT * FROM pg_stat_user_tables;
   ```

3. **Analyze Tables**:
   ```sql
   ANALYZE;
   ```

### Monthly Tasks

1. **Vacuum Database**:
   ```sql
   VACUUM FULL;
   ```

2. **Review Indexes**:
   ```sql
   SELECT * FROM pg_indexes WHERE schemaname = 'public';
   ```

---

## 📱 Mobile Access

pgAdmin is responsive and works on mobile browsers:

- Tablet: Full functionality
- Phone: Basic features available

---

## 🌐 External Access (Production)

For production deployment with external access:

```yaml
# Use reverse proxy (nginx)
pgadmin:
  environment:
    SCRIPT_NAME: /pgadmin
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.pgadmin.rule=Host(`admin.yourdomain.com`)"
```

---

**Service Status**: ✅ Running  
**Access URL**: http://localhost:8081  
**Last Updated**: December 26, 2025  
**Version**: pgAdmin 4 (Latest)  
**Documentation By**: Antigravity Team

*সুবিধাজনক Database Management UI দিয়ে সহজেই সব কিছু পরিচালনা করুন! 🎯*
