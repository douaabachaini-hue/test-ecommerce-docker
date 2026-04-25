#!/bin/bash

# Simple HTML validation script
# Checks if HTML files exist and have basic structure

ERRORS=0

echo "=== HTML Validation Tests ==="

# Check if main HTML files exist
for file in index.html products.html registration.html; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
        
        # Check for DOCTYPE
        if grep -q "<!DOCTYPE html>" "$file"; then
            echo "  ✓ Has DOCTYPE declaration"
        else
            echo "  ✗ Missing DOCTYPE declaration"
            ERRORS=$((ERRORS + 1))
        fi
        
        # Check for html tag
        if grep -q "<html" "$file"; then
            echo "  ✓ Has html tag"
        else
            echo "  ✗ Missing html tag"
            ERRORS=$((ERRORS + 1))
        fi
        
        # Check for head tag
        if grep -q "<head>" "$file"; then
            echo "  ✓ Has head section"
        else
            echo "  ✗ Missing head section"
            ERRORS=$((ERRORS + 1))
        fi
        
        # Check for body tag
        if grep -q "<body>" "$file"; then
            echo "  ✓ Has body section"
        else
            echo "  ✗ Missing body section"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "✗ $file not found"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "=== CSS Validation ==="

# Check if CSS files exist
for file in css/style.css css/products.css css/registration.css; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file not found"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "=== JavaScript Validation ==="

# Check if JS files exist
for file in js/products.js js/registration.js; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file not found"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "=== Test Summary ==="
if [ $ERRORS -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ $ERRORS test(s) failed"
    exit 1
fi
