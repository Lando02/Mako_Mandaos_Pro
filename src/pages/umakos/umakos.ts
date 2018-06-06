import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ModalController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { UserProvider } from '../../providers/user/user';
import {  ChatProvider} from '../../providers/chat/chat';
import { connreq } from '../../models/interfaces/request';
import { AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
/**
 * Generated class for the UmakosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-umakos',
  templateUrl: 'umakos.html',
})
export class UmakosPage {
  firemakos = firebase.database().ref('/Makos');
  newrequest = {} as connreq;
  temparr = [];
  myrequests;
  filteredusers = [];
  searchstring: string;
  makos;
  mako;
  Ocultar1:boolean= true;
  infocard:boolean= true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestProvider, public events: Events, public chatservice: ChatProvider,
    public modalCtrl: ModalController, public afireauth: AngularFireAuth) {
    this.userservice.getmako().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })
  }

  ionViewDidLoad(){
  console.log('ionViewDidLoad UmakosPage')
  }
  ionViewWillEnter(){
    var user = this.afireauth.auth.currentUser;
    if(user){
      this.Ocultar1 = false;
      this.infocard = false;  
    this.requestservice.getmakos();
    this.makos = [];    
    this.events.subscribe('makos', () => {
      this.makos = [];
      this.makos = this.requestservice.makos; 
    });
      }
  }
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('makos');
  }
  /*searchuser(searchbar) {
    this.filteredusers=this.temparr;
    var q = searchbar.target.value;
    if (q!=undefined && q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }*/
  Login(){ 
    let openlogin = this.modalCtrl.create('LoginPage');
    openlogin.present();
  }
  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender == this.newrequest.recipient)
      alert('No te puedes hablar a ti mismo');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Solicitud Enviada',
        subTitle: 'Escribenos al Chat de mandaos y dinos en que te podemos colaborar ',
        buttons: ['ok']
      });     
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
        successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1); 
        }
      
      }).catch((err) => {
        alert(err);
      });
    
      this.firemakos.child(firebase.auth().currentUser.uid).push({
        uid: recipient.uid
      }).then(() => {
        this.firemakos.child(recipient.uid).push({
          uid: firebase.auth().currentUser.uid,
          time: firebase.database.ServerValue.TIMESTAMP,
        });
      });

    this.chatservice.initializemako(recipient);
      let openchat = this.modalCtrl.create('MakochatPage'); 
      openchat.present();
      
    }
  }

  makochat(mako) {
    this.chatservice.initializemako(mako);
    let openchat = this.modalCtrl.create('MakochatPage'); 
    openchat.present();
  }
  
}

    


