# 🔐 সকল কনফিগারেশন এবং পাসওয়ার্ড ভল্ট

আপনার প্রজেক্টের সকল গোপন তথ্য এবং কনফিগারেশন এখানে একসাথে দেওয়া হলো।

## 🐳 Docker কনফিগারেশন (UPDATED)

| সার্ভিস | ইউজারনেম (User) | পাসওয়ার্ড (Pass) | হোস্ট (Internal) | পোর্ট (External) |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL** | `postgres` | `root` | `postgresdb` | `5432` |
| **pgAdmin (UI)** | `admin@amana.com` | `root` | `pgadmin` | `8081` |
| **Redis** | - | - | `redis` | `6379` |
| **Backend API** | - | - | `backend` | `8080` |
| **Frontend** | - | - | `frontend` | `5173` |

## 🌐 অ্যাক্সেস লিংক (URLs)

*   **ওয়েবসাইট (Frontend)**: http://localhost:5173
*   **API (Backend)**: http://localhost:8080/api/products
*   **ডাটাবেস প্যানেল (pgAdmin)**: http://localhost:8081
    *   *email: admin@amana.com*
    *   *password: root*

## 📝 এনভায়রনমেন্ট ভেরিয়েবল

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://postgresdb:5432/amanamart
spring.datasource.username=postgres
spring.datasource.password=root
```
