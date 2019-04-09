import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) {
  }
//   setupDemo() {
//     return this.httpClient.post('http://localhost:3000/api/org.collectable.penguin._demoSetup', null, {withCredentials: true}).toPromise();
//   }

  checkWallet() {
    return this.httpClient.get('http://35.204.34.37.xip.io:3000/api/wallet', {withCredentials: true}).toPromise();
  }

  // signUp(data) {
  //   const collector = {
  //     $class: 'org.collectable.penguin.Collector',
  //     collectorId: data.id,
  //     firstName: data.firstName,
  //     lastName: data.surname
  //   };

  //   return this.httpClient.post('http://35.204.34.37.xip.io:3001/api/org.collectable.penguin.Collector', collector).toPromise()
  //     .then(() => {
  //       const identity = {
  //         participant: 'org.collectable.penguin.Collector#' + data.id,
  //         userID: data.id,
  //         options: {}
  //       };

  //       return this.httpClient.post('http://35.204.34.37.xip.io:3001/api/system/identities/issue', identity, {responseType: 'blob'}).toPromise();
  //     })
  //     .then((cardData) => {
  //     console.log('CARD-DATA', cardData);
  //       const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});

  //       const formData = new FormData();
  //       formData.append('card', file);

  //       const headers = new HttpHeaders();
  //       headers.set('Content-Type', 'multipart/form-data');
  //       return this.httpClient.post('http://35.204.34.37.xip.io:3000/api/wallet/import', formData, {
  //         withCredentials: true,
  //         headers
  //       }).toPromise();
  //     });
  // }

  getCurrentUser() {
    return this.httpClient.get('http://35.204.34.37.xip.io:3000/api/system/ping', {withCredentials: true}).toPromise()
      .then((data) => {
        return data['participant'];
      });
  }
}
