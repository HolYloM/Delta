# Getting Started

This project uses a Single page application based on React, bundled and displayed through Electron.

## Building for Windows

The easiest way to build a production version is to build ON a Windows machine.

do these three steps:
`yarn run package`
to compile the typescript sources etc.

`yarn run make`
makes the actual executable.


## Dependencies

Most dependencies will be installed by runnning `yarn install`.

Additionally, you will need to have [SoX](http://sox.sourceforge.net) installed
and it must be available in your `$PATH`.

### For Mac OS

`brew install sox`

### For most linux disto's

`sudo apt-get install sox libsox-fmt-all`

### For Windows

Working version for Windows is 14.4.1. You can [download the binaries](https://sourceforge.net/projects/sox/files/sox/14.4.1/) or use [chocolately](https://chocolatey.org/install) to install the package

`choco install sox.portable`

## Running the project

To start the React server, run `yarn run start`.

To start electron, showing that content, run `yarn run electron`
