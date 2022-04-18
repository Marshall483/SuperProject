#!/usr/bin/env bash

# ## Installing Apache Maven
#
#     bash < <(curl -L http://gist.github.com/raw/703892/maven_install.sh)
#

mavens=( 2.2.1 3.0.1 )
current="3.0.1"

mirror_host="http://mirror.csclub.uwaterloo.ca/apache//maven/binaries"

install_dir="/opt/maven"
download_dir="/tmp/maven-$$"

printf "===> Installing maven ...\n"

printf "===> Attempting sudo for maven installation ...\n"
sudo echo "Done."

if [[ ! -d "$install_dir" ]] ; then
  printf "===> Creating $install_dir ...\n"
  sudo mkdir -p "$install_dir"
fi

for version in "${mavens[@]}" ; do
  if [[ -d "${install_dir}/apache-maven-${version}" ]] ; then
    printf ">> Skipping ${install_dir}/apache-maven-${version}, already exists.\n"
  else
    tar="apache-maven-${version}-bin.tar.gz"

    printf "===> Downloading $tar to $download_dir ...\n"
    mkdir -p "$download_dir"
    curl -L "${mirror_host}/${tar}" -o "${download_dir}/${tar}"

    printf "===> Extracting $tar to ${install_dir}/apache-maven-${version} ...\n"
    sudo tar xfz "${download_dir}/${tar}" -C "$install_dir"
  fi
done ; unset version

printf "===> Setting maven-${current} as the current version ...\n"
(builtin cd $install_dir && sudo ln -snf ./apache-maven-${current} current)

printf "===> Cleaning up $download_dir ...\n"
rm -rf "$download_dir"

printf "===> Maven installation complete. w00t.\n\n\n"

mvn -N io.takari:maven:wrapper