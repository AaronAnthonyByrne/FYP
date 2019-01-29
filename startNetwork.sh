#!/bin/bash

export FABRIC_VERSION=hlfv11

~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh


composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile identiphone-network@0.0.8.bna

composer network start --networkName identiphone-network --networkVersion  0.0.8 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@identiphone-network

composer-rest-server -c admin@identiphone-network -n never -u true -w true
