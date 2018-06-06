import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  temparr;
  firedata = firebase.database().ref('/Usuarios')
  constructor(public afireauth: AngularFireAuth) {
   // console.log('Hello UserProvider Provider');
  }

  adduser(newuser){
    var promise = new Promise((resolve, reject) => {
    this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
    this.afireauth.auth.currentUser.sendEmailVerification().then(()=>{  
    this.afireauth.auth.currentUser.updateProfile({
      displayName: newuser.displayName,
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/makomandaosdb.appspot.com/o/ImagenesPerfil%2Fperson.jpg?alt=media&token=cac0279e-59cc-4912-9822-206639bbf614'
    }).then(()=>{
      this.firedata.child(this.afireauth.auth.currentUser.uid).set({
        uid: this.afireauth.auth.currentUser.uid,
        displayName: newuser.displayName,
        photoURL: '',
        Address: newuser.address
      }).then(() =>{
        resolve({success: true});
      }).catch((err)=> {
        reject(err);
      })
    }).catch((err)=> {
      reject(err);
    })
  }).catch((err)=> {
    reject(err);
  })
})
})
 return promise;
  }

  

  passwordreset(email){
    var promise = new Promise((resolve, reject) =>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
         resolve({success: true});
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imgurl){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imgurl
      }).then(()=>{
        firebase.database().ref('/Usuarios' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imgurl,
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({succes: true})
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err)
      })
    })
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          if(key!=firebase.auth().currentUser.uid){  
            temparr.push(userdata[key]);       
          }
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getmako() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        var key = userdata
          if(key!=firebase.auth().currentUser.uid)
            temparr.push(userdata['TxwfqJvYdeQcRYuHtBdbtynrwr62']);
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
