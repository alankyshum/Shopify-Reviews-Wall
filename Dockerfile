FROM node:9
WORKDIR /app
ADD ./package.json /app
RUN ["npm", "install"]
