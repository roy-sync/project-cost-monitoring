# Use the official Node.js 18 image as the base image
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 54030
# Start the app
CMD ["npm", "start"]
