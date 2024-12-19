import { RedisClientType } from '@redis/client';
import redis from 'redis'

let redisClient:RedisClientType;

(async () => {
    try {
      redisClient = redis.createClient({
        username: 'default',
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: 'redis-16015.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
            port: 16015
        }
    });
      redisClient.on("error", (error) => console.error(`Error in connecting to Redis:\n${error}`));
      console.log('Redis running on a cloud')
      await redisClient.connect();
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
  
 export async function RedisDel({key}:{key:string}){
  
}