const Redis = require("ioredis");

 const redisClient = new Redis(
  "rediss://default:ARhqAAImcDE5OGU2NDk5ODAxNDU0MzRjYTQ1MmZlYTg0MmM3Njk0N3AxNjI1MA@viable-hagfish-6250.upstash.io:6379"
);
module.exports =redisClient;
// await client.set('foo', 'bar');
