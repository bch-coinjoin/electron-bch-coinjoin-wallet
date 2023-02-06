# electron-bch-coinjoin-wallet
An [Electron.js](https://www.electronjs.org/) desktop app that runs a BCH wallet capable of organizing CoinJoin transactions over IPFS.

## Requirements
- node ^16.19.0
- npm ^8.19.3

## Building From Source

This app is built from [Electron.js](https://www.electronjs.org/) to create a desktop application. To build from source, you will need to build it on a native operating system. Cross-compilation from one OS to another is not supported.

### Install dependencies

- `git clone https://github.com/bch-coinjoin/electron-bch-coinjoin-wallet`
- `cd electron-bch-coinjoin-wallet`
- `npm install`
- `npm run build`

### Run a Locally from Source

- `npm run electron-dev`

### Package to Executable

- `npm run make`

The executable files will be compiled into the `out/` directory.

## License
[MIT](./LICENSE.md)
