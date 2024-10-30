FROM node:20

# Configure debconf to handle package installation without dialog
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NOWARNINGS="yes"

# Install apt-utils and dialog first to avoid warnings
RUN apt-get update && apt-get install -y \
    apt-utils \
    dialog \
    && rm -rf /var/lib/apt/lists/*

# Install locales and generate English locale
RUN apt-get update && apt-get install -y \
    locales \
    locales-all \
    && rm -rf /var/lib/apt/lists/*

# Generate and set English locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8

# Install LibreOffice and additional tools
RUN echo "debconf debconf/frontend select Noninteractive" | debconf-set-selections \
    && apt-get update \
    && apt-get install -y \
    graphicsmagick \
    libreoffice \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace