# build environment
FROM node:14-alpine as build

WORKDIR /build

ENV PATH /build/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

RUN npm run build

# Production environment
FROM node:14-alpine

WORKDIR /app

COPY --from=build /build/dist /app
COPY --from=build /build/node_modules /app/node_modules

CMD [ "node", "index.js" ]