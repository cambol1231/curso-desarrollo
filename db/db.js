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
    try {
      const sql = 'SELECT * FROM ?? WHERE id=?;'
      return await execute(sql, [this.table, id])
    } catch(error) {
      return error
    }
  }

  async countOne (id) {
    try {
      const sql = 'SELECT COUNT(`id`) total FROM ?? WHERE id=?;'
      return await execute(sql, [this.table, id])
    } catch(error) {
      return error
    }
  }

  async getAll () {
    try {
      const sql = 'SELECT * FROM ??;'
      return await execute(sql, [this.table])
    } catch(error) {
      return error
    }
  }

  async create(data) {
    try {
      const sql = 'INSERT INTO ?? SET ?;'
      Object.assign(data, { created_at: new Date() })
      return await execute(sql, [this.table, data])
    } catch(error) {
      return error
    }
  }

  async update(data, id) {
    try {
      const sql = 'UPDATE ?? SET ? WHERE id=?;'
      Object.assign(data, { updated_at: new Date() })
      return await execute(sql, [this.table, data, id])
    } catch(error) {
      return error
    }
  }

  async destroy(id) {
    try {
      const sql = 'DELETE FROM ?? WHERE id=?;'
      return await execute(sql, [this.table, id])
    } catch(error) {
      return error
    }
  }

  static query(sql, params) {
    try {
      return execute(sql, params)
    } catch(error) {
      return error
    }
  }
}

module.exports = DB