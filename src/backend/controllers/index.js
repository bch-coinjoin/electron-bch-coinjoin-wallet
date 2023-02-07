/*
  This is the primary file for the Clean Architecture Controllers.
  This file initializes all Controllers, and is the entry point for
  the Clean Architecture. It initializes the adapters, use-cases, and
  entities.
*/

// Local libraries
const Adapters = require('../adapters')

class Controllers {
  constructor (localConfig = {}) {
    this.adapters = new Adapters()
  }

  async attachControllers (app) {
    console.log('Controllers attached.')
  }

  async initAdapters () {
    await this.adapters.start()
    console.log('Adapters initialized.')
  }
}

module.exports = Controllers
