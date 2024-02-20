# API-REST for Google Chrome extension (Chromium browsers)

This project is a rest api for a google chrome extension to organize url links similar to bookmarks, using [Elysia](https://elysiajs.com) and [Mongoose](https://mongoosejs.com) in [Bun](https://bun.sh)

## Development

Create the __.env__ file in the root of your project and copy this:
```bash
MONGODB_URI= #string conection for mongodb
SECRET_KEY= #secret key for JWT
```
install dependencies:
```bash
bun install
```
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.