FROM node:latest
WORKDIR /usr/src/app

ENV NPM_TOKEN=4ea9a67f-ce5f-47f6-8f10-d559fe85f954
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD .npmrc /usr/src/app/.npmrc
ADD package.json /usr/src/app/package.json

RUN npm install -g npm-run-all --unsafe-perm
RUN npm install
RUN rm -f .npmrc

COPY . .

EXPOSE 3001
