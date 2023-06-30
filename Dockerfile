FROM nginx
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html