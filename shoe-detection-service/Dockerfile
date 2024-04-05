# Use a base image
FROM node:20.5.0

# Set non-interactive installation to avoid hanging builds
ARG DEBIAN_FRONTEND=noninteractive

# Install system dependencies for TensorFlow.js
# These might include Python, build-essential for compiling, and others
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    python3 \
    python3-pip \
    python3-setuptools \
    libfreetype6-dev \
    libpng-dev \
    libzmq3-dev \
    pkg-config \
    g++ \
    wget \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create a symbolic link for python if necessary
RUN ln -s $(which python3) /usr/local/bin/python

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY package*.json .

# Optionally, install global npm packages that might be needed
# RUN npm install -g some-global-package

# Install the dependencies, including @tensorflow/tfjs-node
RUN npm install
RUN npm rebuild @tensorflow/tfjs-node --build-from-source

# If you encounter issues with binary platform mismatches, you can rebuild tfjs-node
# RUN npm rebuild @tensorflow/tfjs-node --build-from-source

# Copy the application code
COPY . .

# Expose the necessary port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
