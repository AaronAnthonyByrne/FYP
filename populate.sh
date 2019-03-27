#!/bin/bash
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Member",
  "email": "90aaronbyrne@gmail.com",
  "firstName": "aaron",
  "lastName": "byrne",
  "ownerId": "101"
}'

composer identity issue -c admin@identiphone-network -f 90aaronbyrne@gmail.com.card -u 90aaronbyrne@gmail.com -a "resource:org.example.mynetwork.Member#90aaronbyrne@gmail.com"

composer card import -f 90aaronbyne@gmail.com.card
composer network ping -c consortiumAdmin@identiphone-network
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Member",
  "email": "emanuel.macroon@gmail.com",
  "firstName": "emanuel",
  "lastName": "macroon",
  "ownerId": "102"
}'
composer participant add -c admin@identiphone-network -d '{
  "$class": "org.example.mynetwork.Member",
  "email": "harry.potter@hogwarts.com",
  "firstName": "harry",
  "lastName": "potter",
  "ownerId": "103"
}'

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
