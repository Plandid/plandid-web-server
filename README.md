# plandid-web-server
This api is the microservice for web client apu access.

# building/running

Make sure you have defined environment variables or a .env file that conforms to the .env.sample file. 
The HTTPS_PORT SSL variables are optional. If you supply, them the server will serve over https.

$ npm install

$ npm start

Or

If you have docker installed

$ npm run build-image

$ npm run run-container

The container will serve over ports 80 for http and if you have defined SSL environment variables it will serve https over 443 and redirect http traffic to that port.
You can of course build the docker image and run it however you please. See the Dockerfile for info about how the image is created.