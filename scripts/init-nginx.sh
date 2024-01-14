#!/bin/bash

version='1.25.3'
ext='zip'
folder="nginx-$version"
file="$folder.$ext"
url='https://nginx.org/download'

curl -OLs $url/$file

rm nginx

unzip -qq $file

mv $folder nginx

rm $file

rm ./nginx/conf/nginx.conf
cp ./packages/config/nginx/nginx.conf ./nginx/conf/