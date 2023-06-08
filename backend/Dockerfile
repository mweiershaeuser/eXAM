FROM node:18-alpine
WORKDIR /eXAMcreate-backend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD npm start
EXPOSE 3000