#!/bin/bash


cd ~/Desktop/LastNeo-main-server/
git pull origin main

cd ~/Desktop/Lastneo-react-app/
git pull origin main

cd ~/Desktop/LastNeo-main-deploy/
sudo cp -r ./LastNeo-main-server/ ~/Desktop/past/1/LastNeo-main-server/
sudo cp -r ./Lastneo-react-app/ ~/Desktop/past/1/Lastneo-react-app/

sudo cp -r ~/Desktop/LastNeo-main-server/ ~/Desktop/LastNeo-main-deploy/LastNeo-main-server/
sudo cp -r ~/Desktop/Lastneo-react-app/ ~/Desktop/LastNeo-main-deploy/Lastneo-react-app/

commit_message=""

if [ "$1" = "" ]
then commit_message="[UPDATED] update backend & frontend code"
else commit_message=$1
fi

git add . 
git commit -m "$message"
git push origin main
