/**
 * @name DB
 * @type class
 * @description Clase encargada de realizar las tareas del CRUD en la base de datos
 * @author Jaime Castrillón <jaimecastrillon@gmail.com>
*/

const execute = require('./excecute')

class DB {

  constructor(table) {
    this.table = table
  }

  async getOne (id) {
    const sql = 'SELECT * FROM ?? WHERE id=?;'
    return await execute(sql, [this.table, id])
  }

  async getAll () {
    const sql = 'SELECT * FROM ??;'
    return await execute(sql, [this.table])
  }

  async create(data) {
    const sql = 'INSERT INTO ?? SET ?;'
    Object.assign(data, { created_at: new Date() })
    return await execute(sql, [this.table, data])
  }

  async update(data, id) {
    const sql = 'UPDATE ?? SET ? WHERE id = ?;'
    Object.assign(data, { updated_at: new Date() })
    return await execute(sql, [this.table, data, id])
  }

  async destroy(id) {
    const sql = 'DELETE FROM ?? WHERE id=?;'
    return await execute(sql, [this.table, id])
  }

  async query(sql, params) {
    return await execute(sql, params)
  }
}

module.exports = DB