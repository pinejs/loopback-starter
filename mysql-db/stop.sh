#!/bin/sh

# Stop the db and remove the container.
docker stop mysql-db && docker rm mysql-db
