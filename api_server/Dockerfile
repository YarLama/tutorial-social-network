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

ENV NODE_ENV production

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

USER node

#Production

FROM node:18-alpine As production

ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/api/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/api/dist ./dist

CMD [ "node", "dist/main.js" ]

