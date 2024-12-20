import {createClient} from 'redis'
import {RedisClientType} from '@redis/client'

let redisClient:RedisClientType;
let pubClient:RedisClientType;
let subClient:RedisClientType;

(async () => {
  try {

    redisClient = createClient({
      username: 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
          host: 'redis-16015.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
          port: 16015
      }
  });
    pubClient = createClient({
      username: 'default',
      password: process.env.PUBSUB_PASSWORD,
      socket: {
          host: 'redis-14434.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
          port: 14434
      }
  });
    subClient = createClient({
      username: 'default',
      password: process.env.PUBSUB_PASSWORD,
      socket: {
          host: 'redis-14434.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
          port: 14434
      }
  });

    redisClient.on("error", (error) => console.error(`Error in connecting to Redis:\n${error}`));
    pubClient.on("error", (error) => console.error(`Error in connecting to RedisPub:\n${error}`));
    subClient.on("error", (error) => console.error(`Error in connecting to RedisSub:\n${error}`));
  
    console.log('Redis running on cloud')
    await redisClient.connect();
    await pubClient.connect();
    await subClient.connect();
  } catch (error) {
    console.log('Some Error Occured in Redis')
  }
})();

export async function RedisSet({key , value , ex}:{key:string,value:string|number,ex:number}) {
  if(!ex) await redisClient.set(key , value)
  else await redisClient.set(key , value , {EX:ex*60 , NX:true})
}

export async function RedisGet ({key}:{key:string}):Promise<string | null>{
  const value = redisClient.get(key)
  return value
}

export { pubClient , subClient } 