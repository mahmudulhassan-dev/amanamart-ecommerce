# 🚀 Quick Start Guide - GitHub Automation

## তিনটি মাত্র স্টেপে আপডেট করুন!

### স্টেপ ১: কোড পরিবর্তন করুন
যেকোনো ফাইল edit করুন (frontend, backend, docs - যাই হোক)

### স্টেপ ২: Automation Run করুন
Terminal এ টাইপ করুন:
```powershell
.\scripts\git-autopush.ps1
```

অথবা শুধু:
```
/git-commit-push
```

### স্টেপ ৩: সম্পন্ন! ✅
আপনার কোড automatically:
- ✅ Version বৃদ্ধি হবে
- ✅ Git এ commit হবে
- ✅ GitHub এ push হবে

---

## Version Types

| যা করছেন | Command |
|-----------|---------|
| ছোট পরিবর্তন/Bug fix | `.\scripts\git-autopush.ps1` |
| নতুন Feature | `.\scripts\git-autopush.ps1 -versionType "minor"` |
| বড় পরিবর্তন | `.\scripts\git-autopush.ps1 -versionType "major"` |

---

## Custom Message দিতে চাইলে

```powershell
.\scripts\git-autopush.ps1 -commitMessage "feat: নতুন shopping cart যোগ করা হয়েছে"
```

---

## 🌐 আপনার Repository

**Link**: [https://github.com/mahmudulhassan-dev/amanamart-ecommerce](https://github.com/mahmudulhassan-dev/amanamart-ecommerce)

---

## সমস্যা হলে?

### Push কাজ করছে না?
```powershell
# GitHub credentials check করুন
git config --global user.name
git config --global user.email

# Manual push try করুন
git push origin main
```

### Version update হচ্ছে না?
```powershell
# Manually version check করুন
Get-Content version.json

# Manual increment
.\scripts\auto-version.ps1
```

---

**সহায়তা**: সম্পূর্ণ documentation এর জন্য `walkthrough.md` দেখুন
