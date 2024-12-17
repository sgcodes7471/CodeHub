## CodeHub is a highly scalable and reliable webApp based on Event Driven Architecture. It promotes collaborativeness among programmers.

## Directory Structure for servers
### There are Four Servers running separately fulfilling different purpose
```
server/  #monolithic server for fetching requests and caching on redis; runs on PORT-8000 by default
├── node_modules/
├── src/
|    ├── config/ 
|    ├── controllers/
|    ├── middlewares/
|    ├── routes/
|    ├── utils/
|    ├── index.ts
|    ├── type.ts
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── package.lock.json

socket/ #server based on pub-sub model for chatroom; runs on PORT-8001 by default
├── node_modules/
├── src/
|    ├── config/
|    ├── index.ts
|    ├── type.ts
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── package.lock.json

producer/ #produces events on topic of for db write/update operations; runs on PORT-8004 by default
├── node_modules/
├── src/
|    ├── config/
|    ├── services/
|    ├── index.ts
|    ├── type.ts
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── package.lock.json

consumer/ #consumes the events from topics of kafka to write/update in bulk in db; runs on PORT-8005 by default
├── node_modules/
├── src/
|    ├── config/
|    ├── services
|    ├── index.ts
|    ├── type.ts
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── package.lock.json
```

## Set Up for Developement
The .env files are supposed to be made by following the .env.sample

### To start the server locally
```
cd <directory>
npm install
npm run dev
```

### To start the client UI locally
```
cd client
npm i
npm run dev
```

## Guidelines for contribution
### Thanks a lot in case you wish to contribute to our repository
### <ul><li>1. Fork it</li><li>2. Clone it in your local by ```git clone https://github.com/<your username>/codehub.git```</li><li>3. Pick a issue(or raise a issue)</li><li>4. Make a separate branch with the issue number</li><li>5. Make the changes then commit it and push to your branch</li><li>6. Raise a PR(add a request to me @sgcodes7471)</li></ul>