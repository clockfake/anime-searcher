FROM node:13-alpine

WORKDIR /opt/anime-searcher

COPY . .

RUN yarn --frozen-lockfile

CMD ["yarn", "start"]
