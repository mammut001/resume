# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install tools required to provision Typst during the build.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates xz-utils \
	&& rm -rf /var/lib/apt/lists/*

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install all dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Pre-provision Typst in the image so the full build works in clean containers.
RUN node scripts/ensure-typst.cjs

# Build the app
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]
