#!/bin/bash


export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "ca63efb035a89889a868",
    "clientSecret": "7331803ca9f7d960a04e7d46cc01c6f40da40347",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "https://aaronanthonybyrne.github.io/identiphone-app/?loggedIn=true",
    "failureRedirect": "/"
  }
}'
export COMPOSER_DATASOURCES='{
    "db": {
        "name": "users",
        "connector": "mongodb",
        "host": "mongodb+srv://admin:adminpassword@cluster0-yuigw.gcp.mongodb.net/test?retryWrites=true"
    }
}'
~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh


composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile identiphone-network@0.0.10.bna

composer network start --networkName identiphone-network --networkVersion  0.0.10 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@identiphone-network

