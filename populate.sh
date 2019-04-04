#!/bin/bash

#Consortium Admin
composer participant add -c admin@identiphone-network -d '{
"$class": "org.hyperledger.composer.system.NetworkAdmin", 
"participantId":"consortiumAdmin"
}'

composer identity issue -c admin@identiphone-network -f consortiumAdmin.card -u identiphoneconsortium@gmail.com -a "resource:org.hyperledger.composer.system.NetworkAdmin#consortiumAdmin"

composer card import -f consortiumAdmin.card
composer network ping -c identiphoneconsortium@gmail.com@identiphone-network

#MEMBER 
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Member",
  "email": "90aaronbyrne@gmail.com",
  "firstName": "aaron",
  "lastName": "byrne",
  "ownerId": "101"
}'

composer identity issue -c admin@identiphone-network -f 90aaronbyrne@gmail.com.card -u 90aaronbyrne@gmail.com -a "resource:org.example.mynetwork.Member#101"

composer card import -f 90aaronbyrne@gmail.com.card
composer network ping -c 90aaronbyrne@gmail.com@identiphone-network

#REATILER
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Retailerr",
  "email": "c15709609@mydit.ie",
  "firstName": "emanuel",
  "lastName": "macroon",
  "ownerId": "102"
}'

composer identity issue -c admin@identiphone-network -f c15709609@mydit.ie.card -u c15709609@mydit.ie -a "resource:org.example.mynetwork.Retailer#102"

composer card import -f c15709609@mydit.ie.card
composer network ping -c c15709609@mydit.ie@identiphone-network

# Recycler
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Member",
  "email": "harry.potter@hogwarts.com",
  "firstName": "harry",
  "lastName": "potter",
  "ownerId": "103"
}'

composer identity issue -c admin@identiphone-network -f harry.card -u newemail -a  "resource:org.example.mynetwork.Recycler#103"

composer card import -f harry.card
composer network ping -c newemail@identiphone-network

#ADD ASSESTS to the network

composer transaction submit -c admin@identiphone-network -d '{
  "$class": "org.hyperledger.composer.system.AddAsset", 
  "targetRegistry": "resource:org.hyperledger.composer.system.AssetRegistry#org.example.mynetwork.Phone",
  "resources": [{
      "$class": "org.example.mynetwork.Phone",
      "IMEI": "10155026145231",  
      "phoneStatus": "OWNED",
      "owner": "103"
      }]
}'

composer transaction submit -c admin@identiphone-network -d '{
  "$class": "org.hyperledger.composer.system.AddAsset", 
  "targetRegistry": "resource:org.hyperledger.composer.system.AssetRegistry#org.example.mynetwork.Phone",
  "resources": [{
      "$class": "org.example.mynetwork.Phone",
      "IMEI": "10255026145231",
      "phoneStatus": "OWNED",
      "owner": "102"
      }]
}'

composer transaction submit -c admin@identiphone-network -d '{
    "$class": "org.hyperledger.composer.system.AddAsset", 
  "targetRegistry": "resource:org.hyperledger.composer.system.AssetRegistry#org.example.mynetwork.Phone",
  "resources": [{
      "$class": "org.example.mynetwork.Phone",
      "IMEI": "10355026145231",
      "phoneStatus": "OWNED",
      "owner": "103"
      }]
}'
