#Build local development#

FROM node:18-alpine As development

WORKDIR /usr/src/api

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

#Build for production

FROM node:18-alpine As build

WORKDIR /usr/src/api

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/api/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

#Production

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]

