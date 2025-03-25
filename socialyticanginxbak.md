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
root@vmi2459211:/etc/nginx/sites-available# ls
default      socialytica.backup                 socialytica.backup.admin  socialytica.broken  socialytica.wordpress
socialytica  socialytica.backup.20250323053632  socialytica.bak           socialytica.net     socialytica.working.bak
root@vmi2459211:/etc/nginx/sites-available# cat socialytica

server {
        server_name socialytica.net;

    gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

    location /_next/static/ {
                alias /var/www/socialytica/.next/static/;
                expires 365d;
                access_log off;
        }

    location ^~ /blog {
        # Remove /blog from the URI when proxying to WordPress
    proxy_pass http://127.0.0.1:8088;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

    proxy_redirect http://127.0.0.1:8088 https://socialytica.net/blog;
                proxy_redirect https://127.0.0.1:8088 https://socialytica.net/blog;
                proxy_redirect http://$host:8088 https://socialytica.net/blog;
                proxy_redirect https://$host:8088 https://socialytica.net/blog;

    # Needed for WordPress admin
                proxy_buffer_size 256k;
                proxy_buffers 8 256k;
                proxy_busy_buffers_size 512k;
                client_max_body_size 80M;
                proxy_read_timeout 300s;
        }

    # Direct admin access path
        location = /blog/direct-admin {
                proxy_pass http://127.0.0.1:8088/direct-admin.php;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto https;

    # Don't cache
                add_header Cache-Control "no-cache, no-store, must-revalidate";

    # Resource limits
                proxy_buffer_size 256k;
                proxy_buffers 8 256k;
                proxy_busy_buffers_size 512k;
                client_max_body_size 50M;
        }

    location / {
                proxy_pass http://127.0.0.1:3000; #change ports for second app i.e. 3001,3002
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/socialytica.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/socialytica.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = socialytica.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
        server_name socialytica.net;
    return 404; # managed by Certbot

}
