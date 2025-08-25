FROM docker.io/library/nginx:mainline-alpine3.22
COPY dist /usr/share/nginx/html
