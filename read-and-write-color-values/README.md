# Notes

Running Eventstore with Docker: https://developers.eventstore.com/server/v20.10/installation/docker.html#run-with-docker
- Note: Had to change image to `image: ghcr.io/eventstore/eventstore:21.10.0-alpha-arm64v8` for Mac M1
https://developers.eventstore.com/clients/dotnet/5.0/connecting.html#eventstoreconnection
https://developers.eventstore.com/clients/grpc/reading-events.html#reading-from-a-revision

# Setup

1. `npm install`
2. `docker-compose up` Bring up eventstoredb and postgres
3. `npm run migrate:run` Create database migrations
4. `npm run sd:write` Start writing queries to eventstore
5. Check out projections:
    `sd:query-redis` - Summarize counts of event log in redis
    `sd:query-postgres` - Write all data from event stream into postgres


# Resources

https://github.com/typeorm/typeorm/issues/2797
https://levelup.gitconnected.com/creating-and-filling-a-postgres-db-with-docker-compose-e1607f6f882f
https://typeorm.io/#/
https://kb.objectrocket.com/redis/run-redis-with-docker-compose-1055