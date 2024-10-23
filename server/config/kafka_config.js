import {Kafka} from 'kafkajs'
import fs from 'fs'
import path from 'path'

const kafka = new Kafka({
    clientId:'codeHub',
    brokers : ['kafka:9092'],
    //The below code is for running kafka on cloud at time of production
    // ssl:{
    //     ca:[fs.readFileSync(path.resolve('../ca_kafka.pem'),"utf-8")],
    //     //make sure to add the ca.pem file in the same directory as this file.
    // },
    // sasl:{
    //     username:"",
    //     password:process.env.PASSWORD,
    //     mechanism:"plain"
    // }
})


let producer = null

export async function createProducer() {
    if(producer) return producer

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return producer
}

export default kafka