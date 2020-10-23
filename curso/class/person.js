class Person {

  constructor(name = '') {
    this.name = name
    this.email = ''
    this.phone = ''
    this.birthDay = ''
    this.kmRuned = 1
  }

  run() {
    return "I am running..."
  }

  static speak() {
    return "I am speaking..."
  }

 }

 // export default Person
 module.exports = Person
