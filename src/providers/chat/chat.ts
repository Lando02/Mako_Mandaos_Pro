import { Injectable } from '@angular/core'; 
import firebase from 'firebase';
import { Events, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications'
import { Icon } from 'ionic-angular/components/icon/icon';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  firemakochats =  firebase.database().ref('/makochats');
  mako: any;
  makomessages = [];
  constructor(public events: Events, private localNotif: LocalNotifications,
  private plt: Platform){

  this.plt.ready().then((rdy) =>{
    this.localNotif.on('click', (notification, state)=>{
      let json = JSON.parse(notification.data)
    })
      });
  }
  initializemako(mako) {
    this.mako = mako;
  }

  

  addnewmessage(msg) {
    if (this.mako) {
      var promise = new Promise((resolve, reject) => {
        this.firemakochats.child(firebase.auth().currentUser.uid).child(this.mako.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP,       
          clearImmediate: true,
        }).then(() => {
          this.firemakochats.child(this.mako.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP,            
            clearImmediate: true,
          }).then(() => {
            this.localNotif.schedule({
              id: 1,
              title: 'Nuevo Mensaje',
              text:'Noticias sobre tu pedido',
              at: new Date(new Date().getTime() + 5 * 1000),
              data: { midata: 'nuevo mensaje'},
              icon: '/assets/icon/makoicon.ico'
            });
            resolve(true);
            })
        })
      })
      return promise;
    }
  }

  getmakomessages() {
    let temp;
    this.firemakochats.child(firebase.auth().currentUser.uid).child(this.mako.uid).on('value', (snapshot) => {
      this.makomessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.makomessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    });
    

  }  

}
