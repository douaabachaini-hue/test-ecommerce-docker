# Guide for PowerPoint Presentation - DS2 Project

## Slide 1: Title Slide
**Title:** Industrialisation et Automatisation du Déploiement Continu
**Subtitle:** Docker & CI/CD with GitHub Actions
**Team Members:** [Your names]
**Date:** [Presentation date]

---

## Slide 2: Project Overview
**Content:**
- Objective: Transform artisanal development to industrialized architecture
- Containerize e-commerce website with Docker
- Automate CI/CD pipeline with GitHub Actions
- Apply DevOps best practices

**Key Points:**
- Focus on infrastructure and automation
- Code serves as base for testing pipeline
- Multi-service architecture

---

## Slide 3: Architecture Docker Finale (Diagram)

**Draw this diagram:**

```
┌─────────────────────────────────────────────────────┐
│              GitHub Repository                       │
│  ┌──────────────────────────────────────────────┐   │
│  │  Push/PR to main/develop                    │   │
│  │       ↓                                      │   │
│  │  GitHub Actions CI/CD Pipeline              │   │
│  │  ├─ Test Job (HTML/CSS validation)          │   │
│  │  ├─ Build Job (Docker image)                │   │
│  │  └─ Security Scan (Trivy)                   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│           Docker Compose Services                    │
│                                                      │
│  ┌────────────────┐    ┌────────────────┐          │
│  │   Web Service  │    │  Log Viewer    │          │
│  │   (Nginx)      │    │  (httpd)       │          │
│  │   Port 8080    │    │  Port 8081     │          │
│  └────────────────┘    └────────────────┘          │
│           ↓                        ↓                │
│  ┌────────────────────────────────────────┐        │
│  │   Custom Bridge Network                 │        │
│  └────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## Slide 4: Dockerfile Explanation

**Key Points:**
- **Base Image:** `nginx:alpine` (lightweight, production-ready)
- **Size:** ~25MB (vs 150MB for standard nginx)
- **Optimizations:**
  - Single-stage build
  - Removes default assets
  - Minimal attack surface

**Code Snippet:**
```dockerfile
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Slide 5: Docker Compose Explanation

**Services:**
1. **web** - Main e-commerce site
   - Builds from Dockerfile
   - Port mapping: 8080:80
   - Health check enabled
   
2. **log-viewer** (Bonus) - Log visualization
   - Uses httpd:alpine
   - Port mapping: 8081:80
   - Volume for logs

**Network:**
- Custom bridge network: `ecommerce-network`
- Service isolation and communication

**Code Snippet:**
```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:80"]
```

---

## Slide 6: CI/CD Pipeline Architecture

**Workflow Triggers:**
- Push to `main` or `develop`
- Pull requests

**Three Jobs:**
```
┌──────────────┐
│  Test Job    │ ← Validates HTML/CSS/JS
└──────┬───────┘
       ↓
┌──────────────┐
│  Build Job   │ ← Builds & tests Docker image
└──────┬───────┘
       ↓
┌──────────────┐
│ Security     │ ← Trivy vulnerability scan
│ Scan (Bonus) │
└──────────────┘
```

---

## Slide 7: GitHub Actions - Success Example

**Screenshot needed:**
- Go to your GitHub repository
- Click on "Actions" tab
- Screenshot a successful workflow run with all green checkmarks ✓

**Caption:**
"CI/CD Pipeline - All jobs passed successfully"

---

## Slide 8: GitHub Actions - Failure & Fix Example

**Demonstration steps:**
1. Show an intentional failure (e.g., remove an HTML file temporarily)
2. Screenshot the failed workflow with red X ✗
3. Show the fix (restore the file)
4. Screenshot the corrected workflow passing

**Key Learning:**
- Branch protection prevents merging failing code
- Quality gates ensure code integrity

---

## Slide 9: Docker Commands Demo

**Commands to demonstrate:**

```bash
# Build image
docker build -t ecommerce-website .

# Run container
docker-compose up -d

# Check running containers
docker ps

# View logs
docker-compose logs -f

# Test website
curl http://localhost:8080

# Stop services
docker-compose down
```

---

## Slide 10: Docker PS Output

**Run this command and screenshot the output:**
```bash
docker ps
```

**Expected output format:**
```
CONTAINER ID   IMAGE              COMMAND                  PORTS                    NAMES
xxxxxxxxxxxx   ecommerce-web      "nginx -g 'daemon off"   0.0.0.0:8080->80/tcp    ecommerce-web
```

---

## Slide 11: Security Scan Results (Bonus)

**Screenshot from GitHub Actions:**
- Show Trivy scan results
- Highlight any vulnerabilities found
- Explain severity levels (CRITICAL, HIGH, MEDIUM, LOW)

**Key Point:**
"Alpine-based images have fewer vulnerabilities compared to full Debian images"

---

## Slide 12: Branch Protection Rules

**Configuration:**
1. Settings → Branches → Add rule
2. Branch pattern: `main`
3. Enable:
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date
   - ✓ Include administrators

**Demonstration:**
- Show attempt to merge with failing CI (blocked)
- Show successful merge after fixing issues

---

## Slide 13: Project Structure

```
ecommerce-website/
├── .github/workflows/ci.yml      # CI/CD pipeline
├── .dockerignore                 # Excluded files
├── Dockerfile                    # Image definition
├── docker-compose.yml            # Service orchestration
├── test.sh                       # Validation script
├── README.md                     # Documentation
└── [HTML/CSS/JS files]           # Website code
```

---

## Slide 14: Challenges & Solutions

**Challenges:**
1. Port conflicts during testing
   - Solution: Used different ports (8080, 9090)
   
2. Image optimization
   - Solution: Chose Alpine-based images
   
3. CI/CD configuration
   - Solution: Multi-job pipeline with dependencies

**Learning Outcomes:**
- Docker containerization
- GitHub Actions workflows
- DevOps best practices

---

## Slide 15: Live Demo

**Demo Checklist:**
1. ✓ Show GitHub repository
2. ✓ Show Actions tab with workflow runs
3. ✓ Run `docker-compose up -d`
4. ✓ Open website in browser (http://localhost:8080)
5. ✓ Show `docker ps` output
6. ✓ Show branch protection settings
7. ✓ Demonstrate workflow logs

---

## Additional Tips for Presentation:

### What to Prepare:
1. Screenshots of GitHub Actions (success and failure)
2. Live demo environment ready
3. All containers stopped before presentation
4. Browser tabs open: GitHub repo, Actions, localhost:8080

### Presentation Flow:
1. Start with architecture overview (2-3 min)
2. Explain Docker configuration (3-4 min)
3. Walk through CI/CD pipeline (3-4 min)
4. Live demonstration (3-4 min)
5. Q&A session

### Key Points to Emphasize:
- ✓ Automation reduces human errors
- ✓ Containerization ensures consistency
- ✓ CI/CD enables rapid, safe deployments
- ✓ Security scanning prevents vulnerabilities
- ✓ Branch protection maintains code quality

---

## Commands to Practice:

```bash
# Before presentation - clean state
docker-compose down
docker system prune -f

# During demo
cd ecommerce-website
docker-compose up -d
docker ps
docker-compose logs web

# Show website
# Open browser: http://localhost:8080

# Cleanup after demo
docker-compose down
```

Good luck with your presentation! 🎓
