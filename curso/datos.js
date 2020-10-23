
const array = require('./data/array')
const dataJson = require('./data/data.json')
const intArray = array.intArray;
const jsonArray = array.jsonArray;

console.log(intArray);
console.log(intArray.join(', '));
console.log(intArray.join(':'));

intArray.push(4);

console.log(intArray.join('-'));
intArray.map(i => {
  console.log(i * 2)
});
//const first = intArray.shift();
//const last = intArray.pop();

//console.log(first)
//console.log(last)
//console.log(intArray)

const filter = intArray.filter(i => i > 2);
console.log(filter);

const value = intArray.find(i => i == 2);
console.log('Value: ', value);

console.log('intArray: ', intArray);

intArray.splice(4, 1);

console.log('intArray: ', intArray);
const json = jsonArray.find(i => i.key == 'value1');
console.log(json);
const jsonFilter = jsonArray.filter(i => i.key == 'value1');
console.log(jsonFilter);
jsonArray.push({ key: 'value5', id: 5});
console.log(jsonArray);