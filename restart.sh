export PATH=$PATH:/var/www/vhosts/globalnation.me/.nodenv/shims
pm2 stop Strapi
pm2 start server.js --name Strapi --log app.log
pm2 save
exit 0
