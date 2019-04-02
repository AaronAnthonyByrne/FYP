#!/bin/bash

source ../envvars.txt

~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh


composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile identiphone-network@0.0.10.bna

composer network start --networkName identiphone-network --networkVersion  0.0.10 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@identiphone-network

