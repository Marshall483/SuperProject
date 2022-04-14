FROM node:17-alpine3.14 AS build
WORKDIR /usr/src
COPY . .
RUN npm install
ENV NODE_ENV=production
RUN npm run build && npm prune --production

FROM node:17-alpine3.14 AS distribution
WORKDIR /opt/pahlava
ENV NODE_ENV=production
COPY --from=build /usr/src/node_modules node_modules
COPY --from=build /usr/src/.next .next
COPY --from=build /usr/src/package.json package.json

EXPOSE 3000
CMD ["npm", "run", "start"]