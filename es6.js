/**
 * Ejercicios de ES6
 * https://github.com/grupogenesys/curso-desarrollo
 */

 const Person = require('./class/person')
 const Teacher = require('./class/teacher')

  let myVar = '';

  const fn = (params) => {
    // TODO: Actions
  }

 const person = new Person('Juan');
 const teacher = new Teacher()

 console.log(person.name);
 console.log(teacher.name);
 console.log(Teacher.speak());
