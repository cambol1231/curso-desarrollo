const dataJson = require('./data/data.json')
const { data, user } = dataJson

const dataArray = ['a', 'e', 'i', 'o', 'u']
const a = dataArray[0]
console.log('Vocal a: ', a)

const [vocalA, vocalE] = ['a', 'e', 'i', 'o', 'u']
console.log('Vocal a: ', vocalA, vocalE, ' => ')

const [userLogin] = user
console.table(userLogin)
// 'a' 'e' ['i', 'o', 'u']

const [,,,userData] = ['a', 'e', 'i', 'o', 'u']


// JSON
// HTML, CSS, JS, JSON, (XML), TEXT, CSV

/*
[
  {

  }
]
*/
const userData = {
  id : "asd21a3s2d1",
  name : "Juan Pérez",
  identification : 1234567890,
  birthDate : new Date(),
  active : true,
  accountBalance : 1253443.25,
  address: {
    city: "Bogotá D.C",
    neighborhood: "20 de Julio",
    number: "20 - 45 Int 7 Apto 301"
  },
  books: [
    "Cien años de soledad",
    "El coronel no tiene quien le escriba",
    "Doce cuentos peregrinos"
  ],
  family: [
    {
      "name": "Juanita Pérez López",
      "relationship": "hija",
      "age": 3
    },
    {
      "name": "María López",
      "relationship": "esposa",
      "age": 28
    }
  ]
}

// console.log(userData)
console.log('ID: ', userData.identification, ' Nombre: ', userData.name)
console.log('Ciudad: ', userData.address.city, ' Barrio: ', userData.address.neighborhood)

console.log(userData)

// userData.pets = ['Cheko', 'Chekis']

Object.assign(userData, { pets: ['Cheko', 'Chekis']})

console.log(userData)

// console.log(data)

data.map(user => {
  if (user.id == 2) {
    Object.assign(user, { pets: ['Cheko', 'Chekis']})
  }

  if(user.address.city.includes('Bogotá D.C')) {
    
  }

  if([6,7,8,9,11,12,15].includes(user.id)) {

  }


  return user
})
console.log('************************************************')
console.log(data)
console.log('************************************************')
for (let user in userData) {
  console.log(user, ' => ', userData[user])
}

console.log('************************************************')
for (let user of data) {
  console.log(user)
  console.log('-------------------')
  for (let u in user) {
    console.log(u, ' => ', user[u])
  }
  console.log('-------------------')
}