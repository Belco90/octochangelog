# Based on a file from https://github.com/mikenikles/cypress-on-gitpod
FROM gitpod/workspace-full-vnc@sha256:e454a80e9af4a5ef2e77b17b5463cfbfe5aac2077e0d583db2d0eac70cf7e591

ENV CYPRESS_CACHE_FOLDER=/workspace/.cypress-cache

# Install Cypress dependencies.
RUN sudo apt-get update \
 && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
   libgtk2.0-0 \
   libgtk-3-0 \
   libnotify-dev \
   libgconf-2-4 \
   libnss3 \
   libxss1 \
   libasound2 \
   libxtst6 \
   xauth \
   xvfb \
 && sudo rm -rf /var/lib/apt/lists/*


# Use nvm to setup the version of node we want to use.
COPY .nvmrc ./
RUN bash -c ". .nvm/nvm.sh \
    && nvm install \
    && nvm use"
RUN echo "nvm use &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

