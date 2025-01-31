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

In order for this app to work, you need to set the following environment variables:

- `GOOGLE_APPLICATION_CREDENTIALS`: The path to your Google Cloud credentials file
- `GOOGLE_DRIVE_FOLDER_ID`: The ID of the folder in Google Drive where the PDFs are stored
- `INTERNAL_REDIS_URL`: The URL of the Redis server

To get the files, you need the folder owner to share the folder with the service account email and then give you the folder ID.
