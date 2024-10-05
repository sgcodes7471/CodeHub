import redis from 'redis'

let redisClient;
let pubClient;
let subClient;

(async () => {
  try {
    redisClient = redis.createClient();
    pubClient = redis.createClient();
    subClient = redis.createClient();
  
    redisClient.on("error", (error) => console.error(`Error in connecting to Redis:\n${error}`));
    pubClient.on("error", (error) => console.error(`Error in connecting to RedisPub:\n${error}`));
    subClient.on("error", (error) => console.error(`Error in connecting to RedisSub:\n${error}`));
  
    console.log('Redis running on 6379')
    await redisClient.connect();
    await pubClient.connect();
    await subClient.connect();
  } catch (error) {
    console.log('Some Error Occured in Redis')
  }
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

async function RedisPush({key, value}){
  await redisClient.rPush(key, value)
}

async function RedisPull({key}){
  const messages = await redisClient.lRange(key, 0, -1)
  return messages;
}


export {redisClient , pubClient , subClient , RedisDel , RedisGet , RedisSet , RedisPush , RedisPull} 