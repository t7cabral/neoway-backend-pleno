# Stage 1
FROM node:14.19.3 as build-web

LABEL version="1.0.0"

LABEL description="Neoway WEB"

COPY --chown=node:node . /home/node/neoway/web
WORKDIR /home/node/neoway/web

RUN npm install \
  && npm run build

# Stage 2
FROM nginx:1.15

COPY --from=build-web /home/node/neoway/web/dist/* /usr/share/nginx/html

# Copy the default nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY ./dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
