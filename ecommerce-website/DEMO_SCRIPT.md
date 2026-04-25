# Live Demo Script - DS2 Presentation

## Pre-Demo Setup (Do this BEFORE the presentation)

### 1. Clean Environment
```bash
# Stop any running containers
docker-compose down

# Remove old images (optional)
docker system prune -f

# Verify clean state
docker ps
```

### 2. Test Everything Works
```bash
# Build image
docker build -t ecommerce-website .

# Start services
docker-compose up -d

# Verify running
docker ps

# Test website (should return HTML)
curl http://localhost:8080

# Stop after testing
docker-compose down
```

---

## During Presentation - Step by Step

### Step 1: Show Project Structure (1 minute)

```bash
# Navigate to project
cd "c:\Users\user\Desktop\Nouveau dossier (3)\ecommerce-website"

# Show files
ls -la
```

**Say:** "Here's our project structure with Docker files, CI/CD configuration, and the website code."

---

### Step 2: Show Dockerfile (1 minute)

```bash
# Display Dockerfile
cat Dockerfile
```

**Say:** "We use Nginx Alpine as our base image - it's lightweight and production-ready. The image size is only ~25MB compared to 150MB for standard Nginx."

---

### Step 3: Show Docker Compose (1 minute)

```bash
# Display docker-compose.yml
cat docker-compose.yml
```

**Say:** "Our docker-compose defines two services: the main web application and a bonus log viewer service. We use a custom bridge network for service isolation."

---

### Step 4: Build and Run (2 minutes)

```bash
# Clean start
docker-compose down

# Build and start
docker-compose up -d

# Show building process
docker-compose up --build
```

**Say:** "Now we'll build and start our services. Docker Compose handles the entire orchestration automatically."

---

### Step 5: Show Running Containers (1 minute)

```bash
# Show running containers
docker ps

# Show specific to our project
docker ps --filter "name=ecommerce"
```

**Expected Output:**
```
CONTAINER ID   IMAGE               COMMAND                  PORTS                    NAMES
xxxxxxxxxxxx   ecommerce-web       "nginx -g 'daemon off"   0.0.0.0:8080->80/tcp    ecommerce-web
```

**Say:** "As you can see, our web service is running and port 8080 is mapped to container port 80."

---

### Step 6: Show Website (1 minute)

**Open browser and navigate to:**
```
http://localhost:8080
```

**Say:** "Our e-commerce website is now running in a Docker container, accessible on port 8080."

---

### Step 7: Show Logs (1 minute)

```bash
# Show live logs
docker-compose logs -f web

# Or show last 20 lines
docker-compose logs --tail=20 web
```

**Say:** "We can easily view logs from our containers. The health check runs every 30 seconds to ensure the service is healthy."

---

### Step 8: Show GitHub Repository (2 minutes)

**Open browser to your GitHub repository**

1. Show main branch
2. Click on "Actions" tab
3. Show successful workflow runs

**Say:** "Every time we push to main or develop, or create a pull request, our CI/CD pipeline automatically runs."

---

### Step 9: Show CI/CD Pipeline (2 minutes)

**In GitHub Actions tab:**

1. Click on a successful workflow run
2. Expand each job:
   - Test Job ✓
   - Build Job ✓
   - Security Scan ✓

**Say:** "Our pipeline has three stages:
1. **Tests** - Validates HTML/CSS structure
2. **Build** - Builds and tests the Docker image
3. **Security Scan** - Scans for vulnerabilities using Trivy"

---

### Step 10: Show Branch Protection (1 minute)

**Navigate to:**
```
Settings → Branches → Branch protection rules
```

**Show:**
- ✓ Require status checks to pass before merging
- ✓ Require branches to be up to date before merging

**Say:** "We've configured branch protection to prevent merging code that doesn't pass our CI/CD checks. This ensures code quality."

---

### Step 11: Demonstrate Failure & Fix (2 minutes)

**Option A: Show screenshot of past failure**

**Option B: Live demo (risky but impressive)**

```bash
# Create test branch
git checkout -b demo-failure

# Remove a file temporarily
mv index.html index.html.bak

# Commit
git add .
git commit -m "Test: Intentional failure"

# Push (will trigger CI/CD)
git push origin demo-failure

# Show on GitHub that CI/CD fails
# Open Actions tab

# Fix it
mv index.html.bak index.html
git add .
git commit -m "Fix: Restore index.html"
git push origin demo-failure

# Show CI/CD now passes
```

**Say:** "When code fails tests, the pipeline blocks the merge. Only after fixing the issue can we merge."

---

### Step 12: Show Docker Image Details (1 minute)

```bash
# Show image size
docker images ecommerce-website

# Show image layers
docker history ecommerce-website
```

**Say:** "Our optimized image is only [X]MB thanks to using Alpine Linux and removing unnecessary files."

---

### Step 13: Cleanup (30 seconds)

```bash
# Stop all services
docker-compose down

# Verify
docker ps
```

**Say:** "With one command, we can stop all services. Everything is reproducible and consistent."

---

## Backup Plans

### If Docker doesn't work:
- Have screenshots of `docker ps` ready
- Show `docker-compose.yml` and explain
- Focus on GitHub Actions demo

### If GitHub Actions doesn't load:
- Have screenshots of successful runs
- Show the workflow file `.github/workflows/ci.yml`
- Explain the three stages

### If internet is slow:
- Pre-download all screenshots
- Use local Docker demo only
- Show presentation slides

---

## Common Questions & Answers

**Q: Why did you choose Nginx Alpine?**
A: It's lightweight (25MB vs 150MB), production-ready, and has fewer security vulnerabilities.

**Q: How long does the CI/CD pipeline take?**
A: Approximately 2-3 minutes for all three jobs to complete.

**Q: What happens if security scan finds vulnerabilities?**
A: The workflow still passes (exit-code: 0), but we can see the report. We can change it to fail by setting exit-code to 1.

**Q: Can you deploy to production automatically?**
A: Yes, we could add a deployment job that triggers on pushes to main branch.

**Q: How do you handle environment variables?**
A: We can use `.env` files with Docker Compose or GitHub Secrets for CI/CD.

---

## Demo Checklist

Before starting demo:
- [ ] All containers stopped
- [ ] Browser tabs ready (GitHub, localhost)
- [ ] Terminal open in project directory
- [ ] Screenshots prepared as backup
- [ ] Internet connection stable
- [ ] Docker Desktop running

During demo:
- [ ] Speak clearly and slowly
- [ ] Point out key features
- [ ] Explain the "why" not just the "what"
- [ ] Show confidence with commands
- [ ] Have backup screenshots ready

After demo:
- [ ] Clean up containers
- [ ] Answer questions
- [ ] Thank the audience

---

## Quick Command Reference Card

Print this and keep it visible during demo:

```bash
# START
docker-compose up -d

# CHECK
docker ps

# LOGS
docker-compose logs -f web

# STOP
docker-compose down

# REBUILD
docker-compose up --build -d

# TEST
curl http://localhost:8080
```

---

**Good luck with your presentation! 🎓**

Remember: The demo is about showing you understand the concepts, not perfection!
