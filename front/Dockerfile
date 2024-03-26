#React app build
FROM node:18-alpine as build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --production && npm cache clean --force

USER node


#Web server
FROM nginx:stable

COPY --from=build /app/dist /var/www/dist

RUN rm -rf /etc/nginx/conf.d/

COPY config/nginx/nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]