FROM node:16.13.2-alpine
WORKDIR /opt/app
RUN npm install -g npm@8.6.0
RUN npm config set legacy-peer-deps true
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
