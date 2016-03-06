# cycling

[![Build Status](https://travis-ci.org/RWander/cycling.svg?branch=master)](https://travis-ci.org/RWander/cycling)

### Quick start

The application file system layout is:
```
cycling
├── client        # web app
├── server        # RESTful-server
├── ..
└── README.md
```

Install dependecies:
```shell
npm install gulp webpack -g
# server setup
cd server && npm install && cd ..
# client setup
cd client && npm install
```

Launch site:
# start server
cd server && gulp server
# start client in 'development' mode
cd ../client
gulp build:dev
gulp serve:dev
