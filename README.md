## Tixte API Wrapper

A simple wrapper around the Tixte API with typings

## How to get started

Install the wrapper

```js
npm install tixte
// or
yarn add tixte
```

Initialize the client (replace YOUR_API_KEY with a valid API key of course)

```js
const { Client } = require("tixte");
const tixteClient = new Client(YOUR_API_KEY);

// Already using a "Client" variable? Try exporting it under a custom name like this:
const { Client : TixteClient } = require("tixte");
const tixteClient = new TixteClient(YOUR_API_KEY);
```

## Supported functions

Account info related:

```js
// Getting user information
await tixteClient.getUserInfo();
```

```js
// Get user registered domains (not support with API key, use an account token instead)
await tixteClient.getDomains();
```

```js
// Get total upload file size/limit
await tixteClient.getSize();
```

File related:

```js
// Uploading a buffer to Tixte
await tixteClient.uploadFile(buffer, domain, { filename, extension });
```

```js
// Updating a file, such as changing it's name or extension
await tixteClient.updateFile(id, { name?, extension? });
```

```js
// Deleting a file
await tixteClient.deleteFile(id);
```

## Questions
If you have any requests or issues, you can open an issue on GitHub or you can contact me through discord at `Exhabition#0448`