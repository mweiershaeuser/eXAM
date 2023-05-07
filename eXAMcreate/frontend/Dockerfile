FROM node:18 AS build
WORKDIR /eXAMcreate-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /eXAMcreate-frontend/dist /usr/share/nginx/html
EXPOSE 80