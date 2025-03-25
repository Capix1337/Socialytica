#backup

server {
    listen 80;
    server_name socialytica.net;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name socialytica.net;

    # SSL configuration (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/socialytica.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/socialytica.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Compression settings
    gzip on;
    gzip_proxied any;
    gzip_types application/javascript application/x-javascript text/css text/javascript;
    gzip_comp_level 5;
    gzip_buffers 16 8k;
    gzip_min_length 256;

    # Next.js static files
    location /_next/static/ {
        alias /var/www/socialytica/.next/static/;
        expires 365d;
        access_log off;
    }

    # Route WordPress-specific paths directly to WordPress
    location ~ ^/(wp-admin|wp-login\.php|wp-content|wp-includes)(/.*)?$ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }

    # WordPress blog via /blog path
    location /blog/ {
        proxy_pass http://127.0.0.1:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }

    # Next.js application (for all other paths)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    if ($host = socialytica.net) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name socialytica.net;
    return 404;
}
