---
description: Git commit এবং push automation - প্রতিটি কাজের পরে automatic update
---

# Git Commit এবং Push Workflow

// turbo-all

এই workflow টি প্রতিটি কাজের পরে automatically version increment, commit এবং push করে।

## ব্যবহার পদ্ধতি

### সাধারণ ব্যবহার (Patch Version Increment)

শুধু এই command টি run করুন:

```powershell
.\scripts\git-autopush.ps1
```

এটি automatically:
1. ✅ Patch version বৃদ্ধি করবে (যেমন: 1.0.0 → 1.0.1)
2. ✅ সব পরিবর্তিত ফাইল add করবে
3. ✅ Commit করবে
4. ✅ GitHub এ push করবে

### Custom Commit Message সহ

```powershell
.\scripts\git-autopush.ps1 -commitMessage "feat: added new product page"
```

### Minor Version Increment

```powershell
.\scripts\git-autopush.ps1 -versionType "minor" -commitMessage "feat: added shopping cart feature"
```

এটি version 1.0.1 → 1.1.0 করবে

### Major Version Increment

```powershell
.\scripts\git-autopush.ps1 -versionType "major" -commitMessage "BREAKING CHANGE: new API structure"
```

এটি version 1.1.0 → 2.0.0 করবে

### শুধু Commit এবং Push (Version Increment ছাড়া)

```powershell
.\scripts\git-autopush.ps1 -skipVersion -commitMessage "docs: updated README"
```

## Version Types ব্যাখ্যা

| Type | কখন ব্যবহার করবেন | উদাহরণ |
|------|-------------------|---------|
| **patch** | Bug fix, ছোট পরিবর্তন, documentation | 1.0.0 → 1.0.1 |
| **minor** | নতুন feature যোগ করা | 1.0.1 → 1.1.0 |
| **major** | Breaking changes, বড় পরিবর্তন | 1.1.0 → 2.0.0 |

## Commit Message Convention

Professional commit message এর format:

```
<type>: <description>

Examples:
- feat: added user authentication
- fix: resolved login bug
- docs: updated installation guide
- style: improved UI design
- refactor: optimized database queries
- test: added unit tests
- chore: updated dependencies
```

## Script কী করে?

### auto-version.ps1
- `version.json` থেকে current version পড়ে
- নতুন version calculate করে
- `version.json` আপডেট করে
- `frontend/package.json` আপডেট করে
- `backend/pom.xml` আপডেট করে

### git-autopush.ps1
- Version increment করে (যদি skip না করা হয়)
- `git add .` দিয়ে সব ফাইল add করে
- Meaningful message সহ commit করে
- GitHub এ push করে
- Success confirmation দেখায়

## ⚠️ Important Notes

> **প্রথমবার ব্যবহারের আগে**:
> - নিশ্চিত করুন Git credentials সেটআপ করা আছে
> - GitHub Personal Access Token configure করা আছে
> - Remote repository যুক্ত আছে

> **Security**:
> - `.env` ফাইল automatically ignore হবে
> - Password বা secret কখনো push হবে না
> - `.gitignore` অনুযায়ী ফাইল filter হবে

## Troubleshooting

### যদি push fail করে:

1. **GitHub credentials check করুন**:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

2. **Personal Access Token setup করুন**:
   - GitHub Settings → Developer settings → Personal access tokens
   - Token তৈরি করে save করুন
   - Push করার সময় password এ token ব্যবহার করুন

3. **Network check করুন**:
```powershell
ping github.com
```

### যদি version update না হয়:

1. **version.json আছে কিনা check করুন**:
```powershell
Test-Path version.json
```

2. **Manually version update করুন**:
```powershell
.\scripts\auto-version.ps1 -versionType "patch"
```

## Quick Reference

| Command | কাজ |
|---------|-----|
| `.\scripts\git-autopush.ps1` | সাধারণ update (patch) |
| `.\scripts\auto-version.ps1` | শুধু version বৃদ্ধি |
| `git status` | Current status দেখুন |
| `git log --oneline -5` | শেষ 5টি commit দেখুন |

---

**তৈরি করেছেন**: Antigravity Team  
**শেষ আপডেট**: ২৬ ডিসেম্বর, ২০২৫
