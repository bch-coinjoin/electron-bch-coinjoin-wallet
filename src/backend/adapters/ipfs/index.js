/*
  This is a Clean Architecture Adapter library that wraps all IPFS dependencies.
*/

// Global npm libraries
const Ctl = require('ipfsd-ctl')
const IpfsApi = require('ipfs-http-client')
const { path } = require('go-ipfs')
// const BCHJS = require('@psf/bch-js')
// const IpfsCoord = require('ipfs-coord')

class Ipfs {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.ipfsd = null // placeholder IPFS daemon
    this.ipfs = null // placeholder IPFS API
    // this.bchjs = new BCHJS()
    // this.IpfsCoord = IpfsCoord

    // Properties of this class instance.
    this.ipfsIsReady = false
    this.ipfsCoordIsReady = false
  }

  async start () {
    // Start te go-ipfs node
    await this.launchIpfs()

    // Get the ID.
    const idRes = await this.ipfsd.api.id()
    console.log('IPFS ID: ', idRes.id)

    // Signal that this adapter is ready.
    this.ipfsIsReady = true

    this.ipfs = this.ipfsd.api

    // await this.initIpfsCoord()

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

  async initIpfsCoord () {
    // JSON-LD and Schema.org schema with info about this app.
    const announceJsonLd = {
      '@context': 'https://schema.org/',
      '@type': 'WebAPI',
      name: 'CoinJoin peer',
      version: 'v1.0.0',
      protocol: 'generic-service',
      description:
        'This is a generic IPFS Serivice Provider that uses JSON RPC over IPFS to communicate with it. This instance has not been customized. Source code: https://github.com/Permissionless-Software-Foundation/ipfs-service-provider',
      documentation: 'https://ipfs-service-provider.fullstack.cash/',
      provider: {
        '@type': 'Organization',
        name: 'Permissionless Software Foundation',
        url: 'https://PSFoundation.cash'
      }
    }

    const ipfsCoordOptions = {
      ipfs: this.ipfs,
      type: 'node.js',
      nodeType: 'external',
      bchjs: this.bchjs,
      privateLog: console.log, // Default to console.log
      isCircuitRelay: false,
      circuitRelayInfo: {},
      apiInfo: '',
      announceJsonLd,
      debugLevel: 2
    }

    this.ipfsCoord = new this.IpfsCoord(ipfsCoordOptions)

    await this.ipfsCoord.start()

    this.ipfsCoordIsReady = true

    return this.ipfsCoord
  }
}

module.exports = Ipfs
