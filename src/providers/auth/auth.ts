import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import firebase from 'firebase';
import FirebaseDatabase from 'firebase/database'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  credentials = {} as usercreds;
  
  constructor(public afireauth: AngularFireAuth) {
   
  }
  login(credentials){
    
    var promise = new Promise((resolve, reject) =>{   
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
        if (this.afireauth.auth.currentUser.emailVerified){
          resolve(true);
        } 
      })
      }).catch((err)=>{
        alert('Contraseña y/o correo invalidos o incorrectos')
      }) 
    
        return promise;
       
  }

}
