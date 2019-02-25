#!/bin/bash

export FABRIC_VERSION=hlfv11
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "ca63efb035a89889a868",
    "clientSecret": "7331803ca9f7d960a04e7d46cc01c6f40da40347",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'

~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh


composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile identiphone-network@0.0.8.bna

composer network start --networkName identiphone-network --networkVersion  0.0.8 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@identiphone-network

composer-rest-server -c admin@identiphone-network -t -a true -n never -u true -w true
