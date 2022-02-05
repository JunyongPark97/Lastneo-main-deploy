#!/bin/bash

# step 0 : git pull each repository
cd ~/LastNeo-main-server/
git pull origin main

cd ~/Lastneo-react-app/
git pull origin main

# step 0: copy whole code to main-deploy repo
sudo rm -rf ~/LastNeo-main-deploy/LastNeo-main-server/
sudo rm -rf ~/LastNeo-main-deploy/Lastneo-react-app/
sudo cp -r ~/LastNeo-main-server/ ~/LastNeo-main-deploy/
sudo cp -r ~/Lastneo-react-app/ ~/LastNeo-main-deploy/

# step 1 : delete ssl
sudo rm -rf ~/LastNeo-main-deploy/docker/nginx/certbot

# step 2 : build docker image with updated code
cd ~/LastNeo-main-deploy/
docker-compose -f docker-compose.yml build

# step 3 : re-copy certbot info to docker/nginx/
sudo cp -r ~/letsencrypt/certbot/ ~/LastNeo-main-deploy/docker/nginx/

# step 4 : docker-compose restart
# 만약 docker-compose down 을 해야할 경우에는 step 1 시작 전 혹은 restart 시작 전으로 해놓도록
docker-compose up -d 
