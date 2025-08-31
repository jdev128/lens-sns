FROM docker.io/library/nginx:mainline-alpine3.22
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
