/*
  This is a Clean Architecture Adapter library that wraps all IPFS dependencies.
*/

// Global npm libraries
const Ctl = require('ipfsd-ctl')
const IpfsApi = require('ipfs-http-client')
const { path } = require('go-ipfs')

class Ipfs {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.ipfsd = null // placeholder IPFS daemon
    this.ipfs = null // placeholder IPFS API

    // Properties of this class instance.
    this.isReady = false
  }

  async start () {
    // Start te go-ipfs node
    await this.launchIpfs()

    // Get the ID.
    const idRes = await this.ipfsd.api.id()
    console.log('IPFS ID: ', idRes.id)

    // Signal that this adapter is ready.
    this.isReady = true

    this.ipfs = this.ipfsd.api

    return this.ipfs
  }

  async launchIpfs (autoStart = true) {
    const ipfsd = await Ctl.createController({
      ipfsHttpModule: IpfsApi,
      ipfsBin: path(),
      ipfsOptions: {
        // repo: '/home/trout/.ipfs'
        start: autoStart,
        init: true
      },
      remote: false,
      disposable: true,
      test: false,
      args: ['--migrate', '--enable-gc', '--enable-pubsub-experiment']
    })
    // console.log('ipfsd: ', ipfsd)

    this.ipfsd = ipfsd

    return this.ipfsd
  }
}

module.exports = Ipfs
