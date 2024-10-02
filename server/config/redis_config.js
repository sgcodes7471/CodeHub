import redis from 'redis'

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error in connecting to Redis:\n${error}`));
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

export {redisClient , RedisDel , RedisGet , RedisSet} 