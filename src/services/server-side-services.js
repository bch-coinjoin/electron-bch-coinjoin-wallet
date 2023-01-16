/*
  This library loads and starts server-side services like colab-coinjoin-api,
  which also starts go-ipfs.
*/

const colabCoinJoinApi = require('colab-coinjoin-api')

class ServerSideServices {
  async start() {
    try {
      colabCoinJoinApi.startServer()
    } catch(err) {
      console.error('Error starting ServerSideServices: ', err.message)
      throw err
    }
  }
}

module.exports = ServerSideServices
