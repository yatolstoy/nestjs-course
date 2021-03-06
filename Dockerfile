FROM node:latest
WORKDIR /opt/app
RUN npm update -g
RUN npm config set legacy-peer-deps true
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
