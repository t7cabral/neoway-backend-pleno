FROM node:14.19.3

LABEL version="1.0.0"

LABEL description="Neoway API RESTful"

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

# Copy API
#RUN mkdir -p /home/node/neoway/api
COPY --chown=node:node . /home/node/neoway/api
WORKDIR /home/node/neoway/api

RUN npm install pm2 -g \
  && npm install -d

EXPOSE 3000

#CMD ["sh", "-c", "npm start"]
CMD ["sh", "-c", "/wait && npm run dev"]
