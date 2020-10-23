module.exports = {
  intArray : [ 1, 2, 3, 2, 5, 2 ],
  floatArray : [ 1.0, 2.1, 3.5 ],
  stringArray : [ 'a', 'b', 'c' ],
  jsonArray : [
    { key: 'value1', id: 1},
    { key: 'value2', id: 2},
    { key: 'value3', id: 3},
    { key: 'value1', id: 4}
  ],
  fn: (name) => {
    return `Mi nombre es ${name}`
  },
  date: new Date(),
}