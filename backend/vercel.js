{
    "version": 2,
    "name": "insta-backend",
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/index.js"
      }
    ]
  }
  