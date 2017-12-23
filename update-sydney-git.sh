#!/bin/bash

pm2 stop sydneydb

sudo rm -R /opt/sydneydb
sudo cp -R ../tinywebdb /opt/sydneydb

cd /opt/sydneydb
pm2 restart sydneydb
