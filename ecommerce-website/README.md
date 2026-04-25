# E-Commerce Website - Docker & CI/CD Project

## 📋 Description
A static e-commerce website for Artisant.tn, containerized with Docker and automated with GitHub Actions CI/CD pipeline.

## 🐳 Docker Prerequisites

### Required Software
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher (included with Docker Desktop)

### Check Installation
```bash
docker --version
docker-compose --version
```

### Install Docker
- **Windows**: Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- **Mac**: Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
- **Linux**: Follow the [official Docker installation guide](https://docs.docker.com/engine/install/)

## 🚀 Quick Start

### Build and Run with Docker
```bash
# Build the Docker image
docker build -t ecommerce-website .

# Run the container
docker run -d -p 8080:80 --name ecommerce ecommerce-website

# Access the website at http://localhost:8080
```

### Run with Docker Compose
```bash
# Start all services
docker-compose up -d

# Access the website at http://localhost:8080
# Access log viewer at http://localhost:8081 (bonus service)

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Run with Bonus Services
```bash
# Start with additional services (log viewer)
docker-compose --profile bonus up -d
```

## 🏗️ Project Structure

```
ecommerce-website/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline configuration
├── css/                        # Stylesheets
│   ├── style.css
│   ├── products.css
│   └── registration.css
├── js/                         # JavaScript files
│   ├── products.js
│   └── registration.js
├── images/                     # Image assets
├── .dockerignore               # Docker ignore rules
├── Dockerfile                  # Docker image configuration
├── docker-compose.yml          # Multi-service orchestration
├── test.sh                     # HTML/CSS/JS validation script
├── index.html                  # Homepage
├── products.html               # Products page
└── registration.html           # Registration page
```

## 🔧 Docker Configuration

### Dockerfile
- **Base Image**: `nginx:alpine` (lightweight, production-ready)
- **Port**: 80 (mapped to 8080 on host)
- **Optimizations**: 
  - Uses Alpine Linux for minimal image size
  - Removes default Nginx assets
  - Single-stage build for simplicity

### Docker Compose
- **Services**:
  - `web`: Main e-commerce website (Nginx)
  - `log-viewer`: Bonus service for log visualization (httpd)
- **Network**: Custom bridge network for service communication
- **Health Check**: Automated health monitoring for web service

## 🔄 CI/CD Pipeline (GitHub Actions)

### Workflow Triggers
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Pipeline Stages

1. **Test Job**
   - Validates HTML structure (DOCTYPE, html, head, body tags)
   - Checks CSS and JavaScript file existence
   - Runs custom validation script

2. **Build Job**
   - Builds Docker image
   - Tests container by running and accessing it
   - Verifies Nginx serves content correctly

3. **Security Scan Job** (Bonus)
   - Uses Trivy to scan for vulnerabilities
   - Checks for CRITICAL and HIGH severity issues
   - Runs only on push events

### Workflow Status
![CI/CD Pipeline](https://github.com/your-username/ecommerce-website/actions/workflows/ci.yml/badge.svg)

## 🧪 Local Testing

### Run Validation Tests
```bash
# On Linux/Mac
chmod +x test.sh
./test.sh

# On Windows (Git Bash or WSL)
bash test.sh
```

### Manual Testing
```bash
# Build image
docker build -t ecommerce-website .

# Run container
docker run -d -p 8080:80 --name test-ecommerce ecommerce-website

# Test accessibility
curl http://localhost:8080

# View container logs
docker logs test-ecommerce

# Cleanup
docker stop test-ecommerce
docker rm test-ecommerce
```

## 🛡️ Branch Protection Rules

### Configuration (GitHub Repository Settings)
1. Go to **Settings** → **Branches** → **Branch protection rules**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### Status Checks Required
- `Run Tests` - Test job must pass
- `Build Docker Image` - Build job must pass

## 📊 Monitoring & Logs

### View Container Status
```bash
docker ps
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web

# Container logs
docker logs ecommerce-web
```

### Health Check
```bash
# Check service health
curl http://localhost:8080
docker inspect --format='{{.State.Health.Status}}' ecommerce-web
```

## 🎓 Educational Project

This project demonstrates:
- ✅ Docker containerization best practices
- ✅ Multi-service orchestration with Docker Compose
- ✅ CI/CD automation with GitHub Actions
- ✅ Automated testing and validation
- ✅ Security scanning with Trivy
- ✅ Branch protection and quality gates

## 👥 Team

This is a group project for DS2 - Docker & CI/CD Module.

## 📝 License

Educational purposes only.
