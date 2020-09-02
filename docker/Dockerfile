FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt-get -y install apt-utils \
    && apt-get -y install apache2 \
    && apt-get -y install tzdata \
    && ln -fs /usr/share/zoneinfo/America/Denver /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    #Setup php libraries
    && apt-get -y install php libapache2-mod-php wget php-cli unzip curl php-mysql

ENTRYPOINT apachectl -D FOREGROUND