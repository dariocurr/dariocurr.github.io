# for format details, see https://docs.docker.com/engine/reference/builder/

ARG VARIANT="latest"

# select image
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}
LABEL author="dariocurr@gmail.com" maintainer="dariocurr@gmail.com" version="0.0.2"

# update apt
RUN apt -qq update \
	&& apt -qq upgrade -y \
	&& export DEBIAN_FRONTEND=noninteractive

# read and change user
ARG USER="node"
USER ${USER}

# add zsh configuration and replace oh-my-zsh with antigen
WORKDIR /home/${USER}/
RUN rm -r .oh-my-zsh; \
	git clone -q https://github.com/zsh-users/antigen.git .antigen;
ADD --chown=${USER} https://gist.githubusercontent.com/dariocurr/9792ae1fb6ddf736d8fea9e20eb13e26/raw/ .zshrc
