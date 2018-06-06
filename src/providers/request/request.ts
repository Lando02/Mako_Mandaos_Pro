import { Injectable } from '@angular/core';
import {Events} from 'ionic-angular';
import { connreq } from '../../models/interfaces/request';
import {UserProvider} from '../../providers/user/user';
import firebase from 'firebase';
/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/Solicitudes');
  firemakos = firebase.database().ref('/Makos');
  userdetails;
  makos;
  request;
  constructor(public userservice: UserProvider, public events: Events) {
  
  }

 
  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
      sender: req.sender,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      }).then(() => {
        resolve({ success: true });
        })
    })
    return promise;  
  }

getmyrequests() {
  let allmyrequests;
  var myrequests = [];
  this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    allmyrequests = snapshot.val();
    myrequests = [];
    for (var i in allmyrequests) {
      myrequests.push(allmyrequests[i].sender);
    }
    this.userservice.getallusers().then((res) => {
      var allusers = res;
      this.userdetails = [];
      for (var j in myrequests)
        for (var key in allusers) {
          if (myrequests[j] === allusers[key].uid) {
            this.userdetails.push(allusers[key]);
          }
        }
      this.events.publish('userdetails');
    })
})
}  



acceptrequest(mako) {
  var promise = new Promise((resolve, reject) => {
    this.makos = [];
    this.firemakos.child(firebase.auth().currentUser.uid).push({
      uid: mako.uid
    }).then(() => {
      this.firemakos.child(mako.uid).push({
        uid: firebase.auth().currentUser.uid
      }).then(() => {
        this.deleterequest(mako).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       }).catch((err) => {
        reject(err);
    })  
      })
      })
  })
  return promise;
}

deleterequest(mako) {
  var promise = new Promise((resolve, reject) => {
   this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(mako.uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
       })
        .then(() => {
        
      }).catch((err) => {
        reject(err);
      })
  })
  return promise; 
}

getmakos() {
  let makosuid = [];
  this.firemakos.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    let allfriends = snapshot.val();
    this.makos = [];
    for (var i in allfriends)
      makosuid.push(allfriends[i].uid);
      
    this.userservice.getallusers().then((users) => {
      this.makos = [];
      for (var j in makosuid)
        for (var key in users) {
          if (makosuid[j] === users[key].uid) {
            this.makos.push(users[key]);
          }
        }
      this.events.publish('makos');
    }).catch((err) => {
      alert(err);
    })
  
  })
} 

}
