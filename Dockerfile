###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

USER node
WORKDIR /workspace/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./prisma ./prisma
RUN npm ci

COPY --chown=node:node . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

USER node
ENV NODE_ENV production
WORKDIR /workspace/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./prisma ./prisma
COPY --chown=node:node --from=development /workspace/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /workspace/app/node_modules ./node_modules
COPY --chown=node:node --from=build /workspace/app/dist ./dist
COPY --chown=node:node --from=build /workspace/app/.env .

CMD [ "node", "dist/main.js" ]