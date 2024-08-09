# this is an answer file for Assignment
# move it up a directory for it to work

FROM node:20 as base
LABEL org.opencontainers.image.authors=pablogalvez31@gmail.com
LABEL org.opencontainers.image.title="My Project backend"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000
# You can install tini multiple ways. This way works in modern apt
# and works across platforms (amd, arm, etc)
RUN apt-get update -qq && apt-get install -qy \ 
    tini \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
# this is good for documenting in build logs how node/npm are configured
RUN npm config list
RUN npm ci \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "./src/index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN apt-get update -qq && apt-get install -qy \ 
    curl \
    --no-install-recommends
RUN npm config list
RUN npm install \
    && npm cache clean --force
CMD ["nodemon", "./src/index.js"]

FROM base as prod
COPY . .
ENV NODE_ENV=production
EXPOSE 3000