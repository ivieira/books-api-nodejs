FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/books-api/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/books-api
RUN npm cache clean && npm install --silent

USER root
COPY . $HOME/books-api
RUN chown -R app:app $HOME/*
USER app

CMD ["node", "index.js"]
