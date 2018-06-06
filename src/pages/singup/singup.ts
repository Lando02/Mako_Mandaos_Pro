import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the SingupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {
  newuser =  {
  email: '',
  password: '',
  displayName: '',
  cpassword: '',
  address: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
             public userservice: UserProvider, public loadingCtrl: LoadingController,
             public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }


  signUp(){
    let toaster = this.toastCtrl.create({
      message: 'Error dude',
      duration: 3000,
      position: 'buttom'
    })
    if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '' 
    || this.newuser.cpassword == '' || this.newuser.address == '' ){
      toaster.setMessage('todos los campos son obligatorios')
      toaster.present();
    }else if(this.newuser.password.length <7){
      toaster.setMessage('Contraseña muy corta, intenta con mas de seis caracteres')
      toaster.present();  
    } else if(this.newuser.password !== this.newuser.cpassword){
      toaster.setMessage('Las contraseñan no coinciden')
      toaster.present(); 
    } else {
    
    let loader = this.loadingCtrl.create({
      content: 'Cargando',
      duration: 3000
    });
    let alertq = this.alertCtrl.create({
      title: 'Confirmacion email',
      subTitle: 'Te hemos enviado un correo',
      buttons:['OK']
    })
    this.userservice.adduser(this.newuser).then((res: any)=>{
      if(res.success){ 
      alertq.present();
      this.navCtrl.push('LoginPage'); 
      loader.present();
      loader.dismiss();
      }else{
      alert('Error' + res )
      }      
    })
  }
  }

  goBack(){
    this.navCtrl.pop();
  }

}

