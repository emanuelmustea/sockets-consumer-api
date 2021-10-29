FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

COPY . ./

ENV UDEV=1

EXPOSE 80/tcp
EXPOSE 80/udp

CMD ["node", "./index.js"]