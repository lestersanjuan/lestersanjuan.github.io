# Docker Deployment to GitHub Pages

This project now includes automated deployment to GitHub Pages using Docker and GitHub Actions.

## How it works

1. **Docker Build**: The GitHub Actions workflow builds a Docker image using the optimized multi-stage Dockerfile
2. **Static Generation**: The Docker container generates static files using Nuxt.js in SPA mode
3. **File Extraction**: Static files are copied from the container to the host
4. **GitHub Pages Deployment**: Files are deployed to GitHub Pages using the official Pages action

## Setup Requirements

### 1. Repository Settings

Make sure GitHub Pages is enabled in your repository:

- Go to Settings → Pages
- Set Source to "GitHub Actions"

### 2. Environment Variables (Optional)

If you're using Firebase or Google Analytics, add these secrets to your repository:

- `API_KEY`
- `AUTH_DOMAIN`
- `PROJECT_ID`
- `STORAGE_BUCKET`
- `MESSAGING_SENDER_ID`
- `APP_ID`
- `MEASUREMENT_ID`

### 3. Automatic Deployment

The workflow triggers automatically on:

- Pushes to the `main` branch
- Manual trigger via "workflow_dispatch"

## Files Modified

- **`.github/workflows/deploy.yml`**: Main deployment workflow
- **`Dockerfile`**: Optimized for CI/CD with Node.js 18 and build caching
- **`static/.nojekyll`**: Prevents Jekyll processing on GitHub Pages
- **`DOCKER_DEPLOYMENT.md`**: This documentation

## Benefits

- **Consistent Environment**: Docker ensures the same build environment every time
- **Optimized Builds**: Multi-stage Docker build with layer caching
- **Automated Deployment**: No manual intervention required
- **Static Site**: Perfect for GitHub Pages hosting requirements

## Troubleshooting

If the deployment fails:

1. Check that GitHub Pages is enabled in repository settings
2. Verify all required secrets are set (if using Firebase/Analytics)
3. Check the Actions tab for detailed error logs
4. Ensure the `dist` directory is properly generated during the Docker build
