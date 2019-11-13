# mouse-tracking-website
## Required tools
`docker && docker-compose`

## Dev environment
Run the app by running `docker-compose up` in the root directory of the project.

The App can be found in the browser on http://localhost:8888

The Database runs on `localhost:3336`, with user:`user` and password:`pass`

## Prod env
To start a Production Environment first we need to create the docker mysql volume from root

`sudo mkdir docker`
`sudo mkdir docker/data`

After this we can simply run docker compose, with the correct compose file

`docker-compose -f docker-compose.prod.yml up -d`

The app can be found on hhtp://{external IP}:8889
