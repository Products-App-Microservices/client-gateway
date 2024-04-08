# Client Gateway

## Dev

1. Clone the repository
2. Install dependencies
3. Create a file `.env` based on `.env.template`
5. Execute `npx run start:dev`

## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```