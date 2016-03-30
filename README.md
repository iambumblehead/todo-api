todo-api
========

A "hello world" for dockerized postgres and express services.

Basic setup is achieved following [this guide][0]. Install [docker engine][1] and [docker machine][2]. Install VirtualBox (`$ sudo apt-get install virtualbox`)

--------------------------------------------
## development install (psql)

Basic setup is achieved following [this guide][10].

Install postgresql-client (`$ sudo apt-get install postgresql-client`)

 1. Create the docker-machine (or use an existing machine seen with `$ docker-machine ls`)

  ```bash
  $ docker-machine create todopsql \
    --driver virtualbox \
    --virtualbox-disk-size "5000" \
    --virtualbox-cpu-count 2 \
    --virtualbox-memory "4112"
    
  $ docker-machine env todopsql
  $ eval "$(docker-machine env todopsql)"
  ```

 2. Build the container

  ```bash
  $ docker build -t todo/container-psql ./todo-psql
  ```

 3. Run container

  ```bash
  $ docker run -it -p 5432:5432 todo/container-psql
  ```
  -d <DB> -U user


Visit the ip address seen with `$ docker-machine env todopsql` at port 5432. ex,

```bash
$ # pass for unmodified install is 'docker'
$ psql -h 192.168.99.101 -p 5432 -d docker -U docker
```

--------------------------------------------
## development install (docker)

 1. Create the docker-machine (or use an existing machine seen with `$ docker-machine ls`)

  ```bash
  $ docker-machine create todoapi \
    --driver virtualbox \
    --virtualbox-disk-size "5000" \
    --virtualbox-cpu-count 2 \
    --virtualbox-memory "4112"
    
  $ docker-machine env todoapi
  $ eval "$(docker-machine env todoapi)"
  ```

 2. Build container

  ```bash
  $## docker build -t todo/dockerizing-nodejs-app .
  $ docker build -t container/todo-api ./todo-api
  ```

 3. Run container

  ```bash
  ## $ docker run -it -p 4500:4500 todo/dockerizing-nodejs-app
  $ docker run -it -p 4500:4500 container/todo-api
  ```

Visit the ip address listed with `$ docker-machine env todoapi` at port 4500, ex, [http://192.168.99.100:4500/save](http://192.168.99.100:4500/test)



[0]: https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application "docker tutorial"
[1]: https://docs.docker.com/engine/installation/linux/ubuntulinux/ "docker engine install"
[2]: https://docs.docker.com/machine/install-machine/ "docker machine install"
[10]: https://docs.docker.com/engine/examples/postgresql_service/ "docker psql"
