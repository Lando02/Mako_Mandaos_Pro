import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the MakomenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-makomenu',
  templateUrl: 'makomenu.html',
})
export class MakomenuPage {
  btnclose: boolean = false;
  Ocultar1:boolean= true;
  Operfil:boolean= false;
  constructor(public navCtrl: NavController, public afireauth: AngularFireAuth, 
    public navParams: NavParams, public modalCrtl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakomenuPage');
    
  }
  ionViewWillEnter(){
    var user = this.afireauth.auth.currentUser;
    if(user){
      this.btnclose = true;
      this.Ocultar1 = false;
      this.Operfil = true; 
    }
  }
  Login(){
    let openlogin = this.modalCrtl.create('LoginPage');
    openlogin.present();
  }
  perfil(){
    let openprofile = this.modalCrtl.create('UprofilePage');
    openprofile.present();
  }
  menu(){
    this.navCtrl.push('TabsPage')
  }
  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('TabsPage');
    })
  }
}
