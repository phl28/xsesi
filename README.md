## Xsesi

Xsesi is a website that shows academic papers and publications from Xsesi built using Next JS.
It does not use a database, but instead pulls the resources from Google Drive which acts as a database for the website.
It is deployed on Render.com

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the redis server:

```bash
redis-stack-server
```

Then in a separate tab, run

```bash
redis-cli
```
