#!/bin/sh

# Stop the db and remove the container.
docker stop mongo-db && docker rm mongo-db
