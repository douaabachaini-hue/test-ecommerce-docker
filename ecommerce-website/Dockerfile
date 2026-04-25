# Stage 1: Use official Nginx Alpine image (lightweight)
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx runs in foreground by default in Alpine image
CMD ["nginx", "-g", "daemon off;"]
