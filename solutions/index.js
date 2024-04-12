/*1 - Arregla esta función para que el código posterior funcione como se espera:*/


import { rejects } from 'node:assert'
import net from 'node:net'
import { resolve } from 'node:path'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 8080, host: ip }, () => {
    client.end()
    //return { time: process.hrtime(startTime), ip } --> Esto esta mal
    callback(null, { time: process.hrtime(startTime), ip } )  //el primer parametro en un callback, es el error, por eso en este caso es null
  })
  
  client.on('error', (err) => {
    client.end()
    callback(err)
    //throw err
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

//2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:
/*
javascript
export function obtenerDatosPromise(callback) {
  setTimeout(() => {
    callback(null, { data: 'datos importantes' });
  }, 2000);
}
*/

export function obtenerDatosPromise(callback) {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      try{
        resolve({ data: 'datos importantes' });
      }catch(e){
        rejects(e)
      }
    }, 2000);
    
  }
  )
}

// Promise.then()
obtenerDatosPromise()
  .then(info => {
    console.log(info);
  })
// await
const {info} = await obtenerDatosPromise()
console.log(info);