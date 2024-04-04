# Use a base image
FROM node

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the necessary port
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "dev"]