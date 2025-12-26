# 🎨 প্রজেক্ট ভিজুয়াল গাইড (Visual Guide)

> **এক নজরে পুরো প্রজেক্ট - ছবি এবং ডায়াগ্রাম সহ**

---

## 📊 সিস্টেম আর্কিটেকচার (System Architecture)

```mermaid
graph TB
    subgraph "🌐 User Layer"
        A[👤 ব্যবহারকারী<br/>Browser]
    end
    
    subgraph "🎨 Frontend Layer"
        B[⚛️ React App<br/>Port: 5173]
    end
    
    subgraph "⚙️ Backend Layer"
        C[☕ Spring Boot API<br/>Port: 8080]
    end
    
    subgraph "💾 Data Layer"
        D[🐘 PostgreSQL<br/>Port: 5432<br/>Primary Database]
        E[🔴 Redis<br/>Port: 6379<br/>Cache]
    end
    
    A -->|HTTP Request| B
    B -->|API Call| C
    C -->|Query Data| D
    C -->|Cache Check| E
    E -.->|Cache Miss| D
    D -.->|Store in Cache| E
    E -->|Cache Hit| C
    C -->|JSON Response| B
    B -->|Render UI| A
    
    style A fill:#4FC3F7,stroke:#0277BD,stroke-width:3px,color:#000
    style B fill:#61DAFB,stroke:#20232A,stroke-width:3px,color:#000
    style C fill:#6DB33F,stroke:#2E7D32,stroke-width:3px,color:#fff
    style D fill:#336791,stroke:#1A3A52,stroke-width:3px,color:#fff
    style E fill:#DC382D,stroke:#7A1712,stroke-width:3px,color:#fff
```

---

## 🔄 ডাটা ফ্লো (Data Flow)

### একজন ইউজার যখন পণ্য খোঁজে (Product Search)

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as ⚛️ Frontend
    participant B as ☕ Backend
    participant R as 🔴 Redis
    participant P as 🐘 PostgreSQL

    U->>F: পণ্য সার্চ করে
    F->>B: GET /api/products?search=phone
    
    B->>R: ক্যাশে আছে কিনা চেক করে
    
    alt ক্যাশে আছে (Cache Hit)
        R-->>B: ডাটা পাওয়া গেছে ✅
        B-->>F: দ্রুত রিটার্ন (< 10ms)
    else ক্যাশে নেই (Cache Miss)
        R-->>B: ডাটা নেই ❌
        B->>P: Database Query
        P-->>B: ডাটা রিটার্ন (100-500ms)
        B->>R: ক্যাশে সেভ করে
        B-->>F: ডাটা রিটার্ন
    end
    
    F-->>U: পণ্য দেখায়
```

---

## 🐳 Docker Services ওভারভিউ

```mermaid
graph LR
    subgraph "🐳 Docker Network: amanamart-network"
        A[🔴 Redis<br/>Cache Layer<br/>Port: 6379]
        B[🐘 PostgreSQL<br/>Database<br/>Port: 5432]
        C[☕ Backend<br/>API Server<br/>Port: 8080]
        D[⚛️ Frontend<br/>UI Server<br/>Port: 5173]
    end
    
    C --> A
    C --> B
    D --> C
    
    style A fill:#DC382D,stroke:#fff,stroke-width:2px,color:#fff
    style B fill:#336791,stroke:#fff,stroke-width:2px,color:#fff
    style C fill:#6DB33F,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#61DAFB,stroke:#fff,stroke-width:2px,color:#000
```

### সার্ভিস বিবরণ:

| সার্ভিস | আইকন | পোর্ট | সাইজ | কাজ |
|---------|------|--------|------|-----|
| Redis | 🔴 | 6379 | ~5MB | সুপারফাস্ট ক্যাশিং |
| PostgreSQL | 🐘 | 5432 | ~80MB | মূল ডাটাবেস |
| Backend | ☕ | 8080 | ~150MB | বিজনেস লজিক |
| Frontend | ⚛️ | 5173 | ~50MB | ইউজার ইন্টারফেস |

---

## 📁 ফোল্ডার স্ট্রাকচার (Folder Structure)

```
🏪 devamanamart-ecommerce/
│
├── 📂 backend/                          # ☕ Java Backend
│   ├── 📂 src/
│   │   ├── 📂 main/
│   │   │   ├── 📂 java/com/amanamart/
│   │   │   │   ├── 📄 AmanamartApplication.java
│   │   │   │   ├── 📂 controller/      # API Endpoints
│   │   │   │   ├── 📂 service/         # Business Logic
│   │   │   │   ├── 📂 repository/      # Database Access
│   │   │   │   └── 📂 model/           # Data Models
│   │   │   └── 📂 resources/
│   │   │       └── 📄 application.properties
│   │   └── 📂 test/
│   ├── 📄 pom.xml                      # Maven Configuration
│   ├── 📄 Dockerfile
│   └── 📄 mvnw
│
├── 📂 frontend/                         # ⚛️ React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 ProductCard.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   └── 📄 HeroSection.jsx
│   │   ├── 📂 pages/
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 ProductList.jsx
│   │   │   └── 📄 ProductDetail.jsx
│   │   ├── 📂 services/
│   │   │   └── 📄 api.js              # Backend Connection
│   │   ├── 📂 assets/
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   ├── 📂 public/
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 Dockerfile
│
├── 📂 docs/                             # 📚 সব ডকুমেন্টেশন
│   ├── 📂 00_Git_Integration/
│   │   └── 📄 README.md                # Git টিউটোরিয়াল
│   ├── 📂 01_Setup/
│   │   └── 📄 README.md                # ইনস্টলেশন গাইড
│   ├── 📂 02_Backend_API/
│   │   └── 📄 README.md                # Backend ডক্স
│   ├── 📂 03_Frontend_React/
│   │   └── 📄 README.md                # Frontend ডক্স
│   ├── 📂 04_Dashboard/
│   │   └── 📄 README.md                # Dashboard ডক্স
│   ├── 📂 05_Troubleshooting/
│   │   └── 📄 README.md                # সমস্যা সমাধান
│   ├── 📂 06_Docker/
│   │   ├── 📄 01_Redis_Service.md
│   │   ├── 📄 02_PostgreSQL_Service.md
│   │   ├── 📄 03_Backend_Service.md
│   │   └── 📄 04_Frontend_Service.md
│   ├── 📂 07_Configuration_Secrets/
│   │   └── 📄 README.md                # পাসওয়ার্ড ভল্ট
│   └── 📄 README.md                    # মাস্টার ইনডেক্স
│
├── 🐳 docker-compose.yml                # Docker সেটআপ ফাইল
├── 📄 README.md                         # প্রজেক্ট ওভারভিউ
├── 📄 .gitignore                       # Git Ignore Rules
├── 📄 CHANGELOG.md                     # পরিবর্তনের ইতিহাস
└── 📄 auto_save.bat                    # Auto Backup Script
```

---

## 🔀 Git ওয়ার্কফ্লো (Git Workflow)

```mermaid
graph LR
    A[📝 কোড লিখুন] --> B[git add .]
    B --> C[git commit -m 'message']
    C --> D[git push]
    D --> E[🌐 GitHub]
    
    style A fill:#FFE082,stroke:#F57F17,stroke-width:2px,color:#000
    style B fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#000
    style C fill:#64B5F6,stroke:#1565C0,stroke-width:2px,color:#000
    style D fill:#BA68C8,stroke:#6A1B9A,stroke-width:2px,color:#fff
    style E fill:#212121,stroke:#fff,stroke-width:2px,color:#fff
```

### ধাপে ধাপে:

```bash
# ১. কোড লিখুন বা পরিবর্তন করুন
# ... আপনার পরিবর্তন ...

# ২. Status চেক করুন
git status

# ৩. সব পরিবর্তন Add করুন
git add .

# ৪. Commit করুন (একটি ভালো message সহ)
git commit -m "Added payment gateway integration"

# ৫. GitHub এ Push করুন
git push origin main
```

---

## 🎯 API Endpoints ম্যাপ

```mermaid
graph TB
    A[🌐 http://localhost:8080]
    
    A --> B[/api/products]
    A --> C[/api/categories]
    A --> D[/api/users]
    A --> E[/api/orders]
    
    B --> B1[GET - সব পণ্য]
    B --> B2[GET /:id - একটি পণ্য]
    B --> B3[POST - নতুন পণ্য]
    B --> B4[PUT /:id - আপডেট]
    B --> B5[DELETE /:id - মুছে ফেলা]
    
    C --> C1[GET - সব ক্যাটাগরি]
    C --> C2[POST - নতুন ক্যাটাগরি]
    
    D --> D1[POST /register - নিবন্ধন]
    D --> D2[POST /login - লগইন]
    D --> D3[GET /profile - প্রোফাইল]
    
    E --> E1[GET - সব অর্ডার]
    E --> E2[POST - নতুন অর্ডার]
    E --> E3[GET /:id - অর্ডার বিস্তারিত]
    
    style A fill:#6DB33F,stroke:#fff,stroke-width:3px,color:#fff
    style B fill:#42A5F5,stroke:#fff,stroke-width:2px,color:#fff
    style C fill:#66BB6A,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#FFA726,stroke:#fff,stroke-width:2px,color:#000
    style E fill:#AB47BC,stroke:#fff,stroke-width:2px,color:#fff
```

---

## 📊 পারফরমেন্স মেট্রিক্স

### ⚡ স্পীড তুলনা (With vs Without Redis)

```mermaid
graph LR
    subgraph "🔴 Redis ছাড়া"
        A1[Request] --> B1[Backend]
        B1 --> C1[PostgreSQL<br/>500ms]
        C1 --> B1
        B1 --> A1
    end
    
    subgraph "🔴 Redis সহ - First Request"
        A2[Request] --> B2[Backend]
        B2 --> C2[Redis<br/>Not Found]
        C2 --> B2
        B2 --> D2[PostgreSQL<br/>500ms]
        D2 --> B2
        B2 --> E2[Cache Save]
        E2 --> B2
        B2 --> A2
    end
    
    subgraph "🔴 Redis সহ - Next Request"
        A3[Request] --> B3[Backend]
        B3 --> C3[Redis<br/>10ms ⚡]
        C3 --> B3
        B3 --> A3
    end
    
    style C1 fill:#336791,color:#fff
    style C2 fill:#DC382D,color:#fff
    style C3 fill:#DC382D,color:#fff
    style D2 fill:#336791,color:#fff
```

### 📈 পারফরমেন্স তুলনা:

| Scenario | Response Time | Improvement |
|----------|---------------|-------------|
| Without Cache | 500ms | - |
| First Request (Cache Miss) | 520ms | -4% (slightly slower) |
| Cached Request (Cache Hit) | 10ms | **98% faster!** ⚡ |

---

## 🔐 সিকিউরিটি লেয়ার্স

```mermaid
graph TB
    A[👤 User Request]
    A --> B{🔒 HTTPS?}
    B -->|No| C[❌ Reject]
    B -->|Yes| D{🎫 Token Valid?}
    D -->|No| E[❌ 401 Unauthorized]
    D -->|Yes| F{🔑 Permission?}
    F -->|No| G[❌ 403 Forbidden]
    F -->|Yes| H[✅ Process Request]
    H --> I[💾 Database]
    I --> J[📤 Response]
    
    style A fill:#4FC3F7,color:#000
    style B fill:#FFA726,color:#000
    style C fill:#EF5350,color:#fff
    style D fill:#FFA726,color:#000
    style E fill:#EF5350,color:#fff
    style F fill:#FFA726,color:#000
    style G fill:#EF5350,color:#fff
    style H fill:#66BB6A,color:#fff
    style I fill:#336791,color:#fff
    style J fill:#42A5F5,color:#fff
```

---

## 🛠️ ডেভেলপমেন্ট ওয়ার্কফ্লো

```mermaid
graph TB
    A[💡 নতুন Feature আইডিয়া]
    A --> B[📝 Requirements লিখুন]
    B --> C[🎨 Design/Mockup তৈরি]
    C --> D[⚛️ Frontend ডেভেলপ]
    D --> E[☕ Backend API তৈরি]
    E --> F[🧪 Testing]
    F --> G{✅ All Tests Pass?}
    G -->|No| H[🐛 Bug Fix]
    H --> F
    G -->|Yes| I[🌿 Git Commit]
    I --> J[🐳 Docker Build]
    J --> K[🚀 Deploy]
    K --> L[📊 Monitor]
    
    style A fill:#FFE082,color:#000
    style C fill:#CE93D8,color:#000
    style D fill:#61DAFB,color:#000
    style E fill:#6DB33F,color:#fff
    style F fill:#4DD0E1,color:#000
    style G fill:#FFA726,color:#000
    style H fill:#EF5350,color:#fff
    style I fill:#81C784,color:#000
    style K fill:#66BB6A,color:#fff
    style L fill:#42A5F5,color:#fff
```

---

## 📦 টেকনোলজি স্ট্যাক ভিজুয়ালাইজেশন

```mermaid
graph TB
    subgraph "🎨 Frontend Stack"
        F1[⚛️ React 18]
        F2[⚡ Vite 5]
        F3[🎨 Tailwind CSS]
        F4[🔀 React Router]
    end
    
    subgraph "⚙️ Backend Stack"
        B1[☕ Java 21]
        B2[🍃 Spring Boot 3.4]
        B3[📦 Maven]
        B4[🔐 Spring Security]
    end
    
    subgraph "💾 Database Stack"
        D1[🐘 PostgreSQL 16]
        D2[🔴 Redis 7]
        D3[📊 JPA/Hibernate]
    end
    
    subgraph "🚀 DevOps Stack"
        O1[🐳 Docker]
        O2[🌐 Docker Compose]
        O3[🌿 Git]
        O4[🐙 GitHub]
    end
    
    F1 --> B2
    B2 --> D1
    B2 --> D2
    
    style F1 fill:#61DAFB,color:#000
    style F2 fill:#646CFF,color:#fff
    style F3 fill:#06B6D4,color:#000
    style B1 fill:#F89820,color:#000
    style B2 fill:#6DB33F,color:#fff
    style D1 fill:#336791,color:#fff
    style D2 fill:#DC382D,color:#fff
    style O1 fill:#2496ED,color:#fff
    style O3 fill:#F05032,color:#fff
```

---

## 🎯 শেখার পথ (Learning Path)

```mermaid
journey
    title আপনার শেখার যাত্রা
    section সপ্তাহ ১: শুরু
      Git ইনস্টল: 5: ইউজার
      প্রজেক্ট সেটআপ: 4: ইউজার
      Docker বেসিক: 3: ইউজার
    section সপ্তাহ ২: বোঝা
      Frontend দেখা: 4: ইউজার
      Backend API: 3: ইউজার
      Database: 2: ইউজার
    section সপ্তাহ ৩: করা
      কোড পরিবর্তন: 5: ইউজার
      নতুন Feature: 4: ইউজার
      Testing: 5: ইউজার
    section সপ্তাহ ৪: মাস্টার
      Production Deploy: 5: ইউজার
      পুরো বোঝা: 5: ইউজার
```

---

## 🎨 ইউজার ইন্টারফেস প্রিভিউ

### 🏠 হোম পেজ ফ্লো

```mermaid
graph TB
    A[🏠 হোম পেজ] --> B[🎨 Hero Section]
    A --> C[🔥 Featured Products]
    A --> D[📂 Categories]
    A --> E[⭐ Best Sellers]
    A --> F[📰 Footer]
    
    B --> B1[প্রধান ব্যানার]
    B --> B2[Search Bar]
    
    C --> C1[Product Card 1]
    C --> C2[Product Card 2]
    C --> C3[Product Card 3]
    
    D --> D1[Fashion]
    D --> D2[Electronics]
    D --> D3[Home & Living]
    
    style A fill:#FF6F61,color:#fff
    style B fill:#4FC3F7,color:#000
    style C fill:#81C784,color:#000
    style D fill:#FFB74D,color:#000
    style E fill:#BA68C8,color:#fff
```

---

## 📊 ডাটাবেস স্কিমা (Simplified)

```mermaid
erDiagram
    PRODUCTS ||--o{ ORDER_ITEMS : contains
    CATEGORIES ||--o{ PRODUCTS : has
    ORDERS ||--o{ ORDER_ITEMS : includes
    USERS ||--o{ ORDERS : places
    
    PRODUCTS {
        int id PK
        string name
        decimal price
        string description
        int category_id FK
        timestamp created_at
    }
    
    CATEGORIES {
        int id PK
        string name
        string slug
    }
    
    ORDERS {
        int id PK
        int user_id FK
        decimal total
        string status
        timestamp created_at
    }
    
    ORDER_ITEMS {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }
    
    USERS {
        int id PK
        string email
        string password
        string name
        timestamp created_at
    }
```

---

## 🎉 সম্পূর্ণ!

এই ভিজুয়াল গাইডটি আপনাকে পুরো প্রজেক্ট একনজরে বুঝতে সাহায্য করবে। প্রতিটি ডায়াগ্রাম একটি নির্দিষ্ট অংশ ব্যাখ্যা করে।

### 🔗 পরবর্তী ধাপ:
- [📚 মাস্টার ইনডেক্স দেখুন](README.md)
- [🌿 Git টিউটোরিয়াল শুরু করুন](00_Git_Integration/README.md)
- [🚀 প্রজেক্ট রান করুন](01_Setup/README.md)

---

*তৈরি করেছেন Antigravity Team ❤️*
