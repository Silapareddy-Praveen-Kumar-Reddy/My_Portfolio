# Deployment Guide for Render

This project is now configured to deploy on Render. Follow these steps:

## Option 1: Using Render Blueprint (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure all files are committed and pushed to your repository

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy**
   - Render will use the configuration from `render.yaml`
   - The build command will run: `npm install && npm run build`
   - The start command will run: `npm start`
   - Your app will be available at a `*.onrender.com` URL

## Option 2: Manual Web Service Setup

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your repository

3. **Configure the service:**
   - **Name**: portfolio-app (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: 
     - `NODE_ENV` = `production`

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your application

## Option 3: Static Site (Alternative)

If you prefer to deploy as a static site instead of a web service:

1. **Create a new Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Static Site"
   - Connect your repository

2. **Configure:**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Deploy**
   - Click "Create Static Site"

## Environment Variables

Currently, no additional environment variables are required. If you need to add any in the future:
- Go to your service settings on Render
- Navigate to "Environment" section
- Add your variables

## Notes

- The app uses Express server to serve the built React app
- The server handles client-side routing (SPA routing)
- Port is automatically set by Render via `PORT` environment variable
- Build output is in the `dist` directory

## Troubleshooting

- **Build fails**: Check the build logs in Render dashboard
- **App not loading**: Ensure `dist` folder is being created during build
- **Routing issues**: The server.js handles all routes and serves index.html for client-side routing

