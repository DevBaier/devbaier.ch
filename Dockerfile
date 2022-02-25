FROM node:alpine

ENV PORT 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

LABEL traefik.docker.network=traefik_traefik
LABEL traefik.enable=true
LABEL traefik.http.routers.devbaier.entrypoints=https
LABEL traefik.http.routers.devbaier.rule=Host(`devbaier.ch`)
LABEL traefik.http.routers.devbaier.tls=true
LABEL traefik.http.services.devbaier.loadbalancer.server.port=3000

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]