#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "Starting DB..."
docker run --name mongo-db -d \
  -p 27017:27017 \
  mongo-db:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."
docker exec mongo-db mongo || exit 1
