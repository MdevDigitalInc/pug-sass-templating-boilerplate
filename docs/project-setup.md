# :electric_plug:Project Setup

This document provides step-by-step instructions on how to setup and run the project on your local development machine.


## :computer:Install Node.js & NPM

This project has as it's main dependency a Node server architecture so it must be installed on your development machine before we proceed with the provided setup script.

### Mac OSX

1. [Install xCode](http://developer.apple.com/technologies/tools/)
2. [Install git](http://help.github.com/mac-git-installation/)
3. [Configure git](./github.md)
4. Install Node by running...

```bash
//Install Homebrew for package management
//Documentation on brew can be found at http://brew.sh

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

//Use Homebrew to install node.
brew install node

```

### Debian

1.Install Node:

```bash
// Prepare install
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash

//Install via apt-get
sudo apt-get install -y nodejs
```

### Windows

Install [Chocolatey](http://chocolatey.org/install) by opening a Admin Power Level Shell and running:

```bash
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
```

Install Node via Chocolatey by running on the same prompt:

```bash
cinst nodejs.install
```

### Other OS

Please visit the (Node.Js)[http://nodejs.org] official website for guides on installing node on your particular OS.

## Run The Installation Script.
Now all you have to do is run the installation script. It will install all of the necessary Node dependencies and make the necessary configurations. At the end, it will launch a local server instance and you are ready to work!

1. Navigate to the black-mesa root project directory. [~/black-mesa/]
2. Execute the dev-environment.sh script by running:

```bash
//Execute Bash Script
./setup/dev-environment.sh
```
