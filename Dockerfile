# Use a Node.js 24 image to match the "engines" field in package.json.
# https://hub.docker.com/_/node
FROM node:24-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install tools required to provision Typst during the build.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates xz-utils \
	&& rm -rf /var/lib/apt/lists/*

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies from the committed lockfile for reproducible builds.
RUN npm ci

# Copy local code to the container image.
COPY . .

# Pre-provision Typst in the image so the full build works in clean containers.
RUN node scripts/ensure-typst.cjs

# Build the app
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]
