#!/bin/bash


composer participant add -c admin@identiphone-network -d '{ "$class": "org.hyperledger.composer.system.NetworkAdmin", "participantId":"consortiumAdmin"}'

composer identity issue -c admin@identiphone-network -f consortiumAdmin.card -u identiphoneconsortium@gmail.com -a "resource:org.hyperledger.composer.system.NetworkAdmin#consortiumAdmin"

composer card import -f consortiumAdmin.card
composer network ping -c identiphoneconsortium@gmail.com@identiphone-network

