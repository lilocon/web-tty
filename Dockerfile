FROM node:latest
USER root
ENV USER root
ENV HOME /root
ENV SHELL zsh
ENV TERM vt100
EXPOSE 3000
VOLUME ["/root"]

RUN apt-get install zsh -y --force-yes
RUN git clone https://github.com/phpres/web-tty.git /webtty/

WORKDIR /webtty/
RUN npm install
WORKDIR /root/
CMD node /webtty/server.js
