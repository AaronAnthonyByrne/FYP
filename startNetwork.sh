#!/bin/bash

nohup composer-rest-server -c admin@identiphone-network -t -n never -u true -w true -a true -m true > rest-server.out 2> rest-server.err < /dev/null &

