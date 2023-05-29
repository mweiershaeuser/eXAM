FROM node:18-alpine AS build
WORKDIR /eXAMcreate-frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
ENV EXAMCREATE_FRONTEND_HOST="localhost"
ENV EXAMCREATE_BACKEND_URL="http://localhost:3000"
ENV EXAMCREATE_STATSERVICE_URL="http://localhost:8000"
ENV NGINX_ENVSUBST_OUTPUT_DIR="/etc/nginx"
COPY nginx.conf /etc/nginx/templates/nginx.conf.template
COPY --from=build /eXAMcreate-frontend/dist /usr/share/nginx/html
EXPOSE 80