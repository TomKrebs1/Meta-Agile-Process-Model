#!/bin/bash

echo "#################################################################"
echo "######################## Building UI ############################"
echo "#################################################################"
docker build -t map-ui:latest -f ./map-ui/Dockerfile map-ui/

echo "#################################################################"
echo "###################### Building Service #########################"
echo "#################################################################"
mvn -f map-service/pom.xml spring-boot:build-image -Dspring-boot.build-image.imageName=map-service:latest

echo "#################################################################"
echo "################ Building Finished starting deploy ##############"
echo "#################################################################"
docker-compose -f map-app-compose.yml up -d
