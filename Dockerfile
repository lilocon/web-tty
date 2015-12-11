FROM node:latest
USER root
ENV USER root
ENV HOME /root
ENV SHELL zsh
ENV TERM vt100
EXPOSE 3000

RUN echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib\n\
deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib\n\
deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib\n\
deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" > /etc/apt/sources.list

RUN apt-get update
RUN apt-get install zsh git curl -y
RUN curl -L https://raw.github.com/phpres/oh-my-zsh/master/tools/install.sh > /tmp/installohmyzsh.sh
RUN chmod a+x /tmp/installohmyzsh.sh
RUN git clone https://github.com/phpres/web-tty.git /webtty/
WORKDIR /webtty/
RUN npm install

CMD node /webtty/server.js