/*
  This is the primary file for the Adapters. This follows Clean Architecture
  design. This file is launched by the Controllers index.js file.
*/

// Local libraries
const IpfsAdapter = require('./ipfs')

class Adapters {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.ipfs = new IpfsAdapter(localConfig)
  }

  async start () {
    await this.ipfs.start()

    console.log('Adapters have been started.')
  }
}

module.exports = Adapters
