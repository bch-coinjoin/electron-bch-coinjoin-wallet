/*
  This is the primary file for the Adapters. This follows Clean Architecture
  design. This file is launched by the Controllers index.js file.
*/

class Adapters {
  async start () {
    console.log('Adapters have been started.')
  }
}

module.exports = Adapters
