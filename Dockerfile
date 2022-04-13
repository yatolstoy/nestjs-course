FROM node:16.13.2-alpine
WORKDIR /opt/app
RUN npm config set legacy-peer-deps true
RUN node install/libvips && node install/dll-copy && prebuild-install
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
