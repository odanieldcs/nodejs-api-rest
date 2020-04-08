FROM node:12.16.1

ENV HOME=/home/app

RUN apt-get update

COPY package.json package-lock.json $HOME/

WORKDIR $HOME

RUN npm install --silent

COPY . $HOME/

CMD ["npm", "start"]
