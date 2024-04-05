# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# If you're using Yarn, you can run `yarn install` instead
# RUN yarn install

# Bundle the source code inside the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Run the application in development mode with nodemon
CMD ["node", "index.js"]
