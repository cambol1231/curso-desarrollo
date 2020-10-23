// import Person from './person';
const Person = require('./person')

class Teacher extends Person {
  
  constructor() {
    super('Jaime')
    this.job = 'Teach'
  }

  read() {
    return 'I am reading ...'
  }

 }

 // export default Teacher
 module.exports = Teacher