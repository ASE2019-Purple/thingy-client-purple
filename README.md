# thingy-client-purple

[![Build Status](https://travis-ci.org/ASE2019-Purple/thingy-client-purple.svg?branch=master)](https://travis-ci.org/ASE2019-Purple/thingy-client-purple)

## Github Pages

A demo of the current release is published at [ase2019-purple.github.io](https://ase2019-purple.github.io "ase2019-purple.github.io") and the build of the current master branch is available at [ase2019-purple.github.io/thingy-client-purple](https://ase2019-purple.github.io/thingy-client-purple "ase2019-purple.github.io/thingy-client-purple"). 

### Publish the Release

To publish the page a Github Account with permissions for 
[github.com/ASE2019-Purple/ASE2019-Purple.github.io](https://github.com/ASE2019-Purple/ASE2019-Purple.github.io "github.com/ASE2019-Purple/ASE2019-Purple.github.io")
is required. 

``` shell
./gh-deploy.sh
```

## Docker

### Run

``` shell
docker run -d -p 8080:80 --name thingy-client-purple_app_1  thingy-client-purple
```

### Build 

``` shell
docker build . -t thingy-client-purple
```
### Build and run with docker-compose  

``` shell
in the project folder dokcer-compose up -d
```

## Vue CLI Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Resources

### Axios (HTTP client)

  - https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
