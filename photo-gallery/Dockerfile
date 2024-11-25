FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run bundle

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "8080", "-s", "."]