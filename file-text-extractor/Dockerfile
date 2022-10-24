FROM node:14.19.3

LABEL version="1.0.0"

LABEL description="Neoway file-text-extractor"

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

COPY --chown=node:node . /home/node/neoway/file-text-extractor/
WORKDIR /home/node/neoway/file-text-extractor/

RUN npm install pm2 -g \
  && npm install -d

CMD ["sh", "-c", "/wait && npm run dev"]
