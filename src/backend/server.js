/*
  This file launches the back-end server running Koa and a go-ipfs node
*/

// Global npm libraries
const Koa = require('koa')

// Local libraries
const Controllers = require('./controllers')

class Server {
  constructor () {
    // Encapsulate dependencies
    this.server = null // Placeholder. Will contains instance of Koa server
    this.controllers = new Controllers()
  }

  async startServer () {
    try {
      const app = new Koa()

      await this.controllers.initAdapters()

      await this.controllers.attachControllers(app)

      const port = 5000
      this.server = await app.listen(port)
      console.log(`Koa server started on port ${port}`)

      return app
    } catch (err) {
      console.error('Could not start server. Error: ', err)

      console.log(
        'Exiting after 5 seconds.'
      )
      await this.sleep(5000)
      this.process.exit(1)
    }
  }
}

module.exports = Server
