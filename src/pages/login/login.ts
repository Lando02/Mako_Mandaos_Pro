import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import {AuthProvider} from '../../providers/auth/auth';
import {UserProvider} from '../../providers/user/user';
import {FirebaseDatabase} from 'firebase/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import firebase, { storage } from 'firebase'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
  public alertCtrl: AlertController, public mdlCtrl: ModalController,
  public toastCtrl: ToastController, public userservice: UserProvider  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  signIn(){
    let alerta = this.alertCtrl.create({
      buttons: ['OK']
    }); 
    this.authservice.login(this.credentials).then((res: any)=>{
      if (!res.code){     
      this.navCtrl.setRoot('TabsPage');
      }else{
        alerta.present();
      }
    })
  }
  signUp(){
    let opensignup = this.mdlCtrl.create('SingupPage');
    opensignup.present();
  }
  passwordreset(){
    let openreset = this.mdlCtrl.create('PasswordresetPage');
    openreset.present();
  }
  
  goback(){
    this.navCtrl.pop();
  }
  
}
