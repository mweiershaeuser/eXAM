FROM node:18-alpine AS build
WORKDIR /eXAMcreate-frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /eXAMcreate-frontend/dist /usr/share/nginx/html
EXPOSE 80