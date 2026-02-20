# Commit Workflow Guide

## 🚀 **Your Pre-Commit Workflow (Recommended)**

### **Step 1: Navigate to project root**
```bash
cd "C:\Users\Jade\Documents\Jade\4th Year\SP\SP"
```

### **Step 2: Build & Format Everything**
```bash
pnpm build:all    # Builds backend + frontend
pnpm format       # Formats both frontend & backend code
pnpm ci          # Runs all checks (format, lint, build, test)
```

### **Step 3: Check Status**
```bash
pnpm commit:status  # Shows git status for both repos
```

### **Step 4: Commit Changes**
```bash
# Frontend changes
cd dent-app
git add .
git commit -m "your frontend changes"

# Backend changes  
cd ../dent-app-be
git add .
git commit -m "your backend changes"
```

## ⚡ **Quick Commands**

### **One-Command Pre-Commit Check**
```bash
cd "C:\Users\Jade\Documents\Jade\4th Year\SP\SP"
pnpm ci
```
This runs: format check → lint → build frontend → build backend → test backend

### **One-Command Pre-Commit Fix**
```bash
cd "C:\Users\Jade\Documents\Jade\4th Year\SP\SP"
pnpm pre-commit
```
This runs: format → lint fix → build frontend → build backend → test backend

## 📂 **Your Git Repository Structure**

```
C:\Users\Jade\Documents\Jade\4th Year\SP\SP\
├── dent-app/           # Frontend repo (git repo #1)
│   ├── .git/
│   └── ...frontend files
├── dent-app-be/        # Backend repo (git repo #2)
│   ├── .git/
│   └── ...backend files
└── package.json        # Root scripts (not in any git repo)
```

## ✅ **What Each Command Does**

| Command | Frontend | Backend |
|---------|----------|---------|
| `pnpm format` | Biome format | Google Java Format |
| `pnpm build:all` | Next.js build | Maven compile |
| `pnpm ci` | Lint + Build | Format + Compile + Test |

## 🎯 **Answer to Your Questions**

**Q: Can I do `git add .` and all changes will be committed including backend?**

**A: No** - You have **separate git repositories**:
- `dent-app/` has its own git repo (frontend)
- `dent-app-be/` has its own git repo (backend)

You need to commit to each repository separately:

```bash
# Commit frontend changes
cd dent-app
git add .
git commit -m "frontend changes"

# Commit backend changes
cd ../dent-app-be  
git add .
git commit -m "backend changes"
```

## 🔄 **Recommended Daily Workflow**

1. **Start Development:**
   ```bash
   cd "C:\Users\Jade\Documents\Jade\4th Year\SP\SP"
   pnpm dev  # Starts both frontend & backend
   ```

2. **Before Committing:**
   ```bash
   pnpm ci   # Check everything
   ```

3. **Commit Changes:**
   ```bash
   pnpm commit:status  # See what changed
   # Then commit to each repo individually
   ```
