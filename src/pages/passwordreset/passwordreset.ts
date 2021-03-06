import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){
    let alert = this.alertCtrl.create({
      buttons: ['OK']
    });
    this.userservice.passwordreset(this.email).then((res: any)=>{
      if(res.success){
      alert.setTitle('Correo Enviado'),
      alert.setSubTitle('Por favor sigue las instrucciones en el email para cambiar tu contraseña')
      alert.present();
      }
    }).catch((err)=>{
      alert.setTitle('Fallo');
      alert.setSubTitle(err);
      alert.present();
    })
  }

  goBack(){
    this.navCtrl.pop();
  }
}
