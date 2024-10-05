import redis from 'redis'

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error in connecting to Redis:\n${error}`));
  console.log('Redis running on 6379')
  await redisClient.connect();
})();

async function RedisSet({key , value , ex}){
  if(!ex) await redisClient.set(key , value)
  else await redisClient.set(key , value , {EX:ex*60 , NX:true})
}

async function RedisGet ({key}){
  const value = redisClient.get(key)
  return value
}

async function RedisDel({key}){
  redisClient.del(key , (error , response)=>{
      if(response === 1) console.log('Cleared from Cached:',key)
      else console.log('Not Cleared from Cached' , key)
  })
}

async function RedisPush({ key, value }) {
  await redisClient.rPush(key, value)
}

async function RedisPull({ key }) {
  const messages = await redisClient.lRange(key, 0, -1)
  return messages;
}

export {redisClient , RedisDel , RedisGet , RedisSet , RedisPush , RedisPull} 