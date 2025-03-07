#!/bin/bash

# Export the correct PATH for nodenv
export PATH=$PATH:/var/www/vhosts/globalnation.me/.nodenv/shims

# Stop the existing PM2 application named Strapi
pm2 stop Strapi

# Optionally delete the previous process if you want to ensure it's fully stopped
# pm2 delete Strapi

# Install dependencies for the main project
yarn install

# Build the app
yarn build

# Navigate to the gntv-dashboard plugin directory
cd ./src/plugins/gntv-dashboard || exit

# Install dependencies for the gntv-dashboard plugin
yarn install

# Build the gntv-dashboard plugin
yarn build

# Return to the root directory (optional)
cd ../../..

# Start the app using PM2
pm2 start server.js --name Strapi --log app.log

# Optionally, save the PM2 process list
pm2 save

# Exit the script with a success code
exit 0
