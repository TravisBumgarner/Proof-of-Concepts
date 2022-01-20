# Notes

Running Eventstore with Docker: https://developers.eventstore.com/server/v20.10/installation/docker.html#run-with-docker
- Note: Had to change image to `image: ghcr.io/eventstore/eventstore:21.10.0-alpha-arm64v8` for Mac M1
https://developers.eventstore.com/clients/dotnet/5.0/connecting.html#eventstoreconnection
https://developers.eventstore.com/clients/grpc/reading-events.html#reading-from-a-revision

# Setup

1. `npm run sd:es` 
2. `npm run sd:write`
3. `npm run sd:read`

Events are written and read once per second. 

# Resources

https://github.com/typeorm/typeorm/issues/2797
https://levelup.gitconnected.com/creating-and-filling-a-postgres-db-with-docker-compose-e1607f6f882f
https://typeorm.io/#/