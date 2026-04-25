# Git & GitHub Workflow Guide for DS2 Project

## Initial Setup (One time only)

### Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Clone Repository (if not already done)
```bash
git clone <your-repo-url>
cd ecommerce-website
```

---

## Daily Workflow

### 1. Start Working on a Feature
```bash
# Always start from latest main
git checkout main
git pull origin main

# Create a new branch
git checkout -b feature-docker-v1
```

### 2. Make Changes and Commit
```bash
# Check what files changed
git status

# View changes
git diff

# Add files to staging
git add .
# OR specific files
git add Dockerfile docker-compose.yml

# Commit with meaningful message
git commit -m "Add Dockerfile with Nginx Alpine base"
```

### 3. Push to GitHub
```bash
# Push branch to remote
git push origin feature-docker-v1

# If first time pushing this branch
git push -u origin feature-docker-v1
```

### 4. Create Pull Request
1. Go to GitHub repository
2. Click "Compare & pull request"
3. Add title and description
4. Wait for CI/CD checks to pass (green ✓)
5. Merge when all checks pass

---

## Common Scenarios

### Scenario 1: CI/CD Fails - Fix and Retry

```bash
# Check what failed on GitHub Actions tab

# Fix the issue locally
# (edit files as needed)

# Stage and commit fixes
git add .
git commit -m "Fix Dockerfile build error"

# Push again - PR will automatically update
git push origin feature-docker-v1
```

### Scenario 2: Update Branch with Latest Main

```bash
# Switch to main
git checkout main

# Get latest changes
git pull origin main

# Go back to your branch
git checkout feature-docker-v1

# Merge main into your branch
git merge main

# Resolve conflicts if any, then push
git push origin feature-docker-v1
```

### Scenario 3: Test Locally Before Pushing

```bash
# Test Docker build
docker build -t ecommerce-website .

# Run test script
bash test.sh
# OR on Windows Git Bash
./test.sh

# If tests pass, then commit and push
git add .
git commit -m "Pass all local tests"
git push origin feature-docker-v1
```

---

## Branch Strategy for Team

### Recommended Branches:
```
main                    ← Production (protected)
  └── develop          ← Integration branch
        ├── feature-docker-v1 (Student 1)
        ├── feature-docker-v2 (Student 2)
        └── feature-cicd-pipeline (Student 3)
```

### Each Student Should:
1. Create their own feature branch from `develop`
2. Test locally
3. Push and create PR to `develop`
4. Wait for CI/CD to pass
5. Merge after approval

---

## Essential Commands Reference

### View Status
```bash
git status                    # Current state
git log --oneline -10        # Last 10 commits
git branch -a                # All branches
```

### Undo Changes
```bash
git restore <file>           # Discard local changes
git reset --soft HEAD~1      # Undo last commit (keep changes)
git reset --hard HEAD~1      # Undo last commit (discard changes) ⚠️
```

### View CI/CD Status
```bash
# Check GitHub Actions
# Visit: https://github.com/<username>/<repo>/actions

# Or use GitHub CLI (if installed)
gh run list                  # List workflow runs
gh run view <run-id>         # View specific run
```

---

## Collaboration Rules

### ✅ DO:
- Always pull before starting work
- Create feature branches (never work on main)
- Write clear commit messages
- Test locally before pushing
- Wait for CI/CD to pass before merging
- Review teammates' PRs

### ❌ DON'T:
- Commit directly to main
- Push without testing
- Ignore failing CI/CD checks
- Force push (--force) unless absolutely necessary
- Merge without review

---

## Troubleshooting

### Problem: "Updates were rejected"
```bash
# Someone else pushed changes. Pull first:
git pull origin feature-docker-v1
# Resolve conflicts if any
git push origin feature-docker-v1
```

### Problem: "Branch protection requires status checks"
```bash
# This is expected! Wait for GitHub Actions to complete
# Check the Actions tab on GitHub
# Fix any failures and push again
```

### Problem: Merge Conflicts
```bash
# See conflicting files
git status

# Edit files to resolve conflicts
# Look for <<<<<<< and >>>>>>> markers

# After resolving:
git add .
git commit -m "Resolve merge conflicts"
git push origin feature-docker-v1
```

---

## Quick Checklist Before Submission

- [ ] All Docker files created and tested
- [ ] GitHub Actions workflow passing (green ✓)
- [ ] Branch protection enabled on main
- [ ] README.md updated
- [ ] All team members contributed to branches
- [ ] Presentation slides ready
- [ ] Live demo tested

---

## Useful Links

- GitHub Actions: https://github.com/features/actions
- Docker Documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- GitHub Branch Protection: https://docs.github.com/en/repositories/configuring-branches-and-merges

---

## Emergency Contacts

If CI/CD keeps failing:
1. Check workflow logs on GitHub Actions tab
2. Run tests locally: `bash test.sh`
3. Test Docker build: `docker build -t ecommerce-website .`
4. Compare with example files
5. Ask instructor for help

Good luck! 🚀
