FROM node:18-alpine

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server.js server.js

RUN npm install

COPY ..

EXPOSE 5000

ENV MONGO_URL=mongodb://mongo:27017/codehub
ENV REDIS_URL=redis://redis:6379
ENV KAFKA_BROKER=kafka:9092

ENTRYPOINT ["node" , "server.js"]

#in terminal run docker -t build codehub-nodejs to create the image
#in terminal then run docker run -it -e ${enviroment varibales} -p 5000:5000 codehub-nodejs
#to enter a container > docker exec -it ${conatianer id}