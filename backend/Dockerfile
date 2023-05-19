FROM node:18-alpine

RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /eXAMcreate-backend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD npm start
EXPOSE 3000