import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-uprofile',
  templateUrl: 'uprofile.html',
})
export class UprofilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
      })
  }

  Login(){
    let modal= this.modalCtrl.create('LoginPage');
    modal.present();
  }
  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['OK']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Actualizado');
          statusalert.setSubTitle('has cambiado tu Foto!!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = url;
        })  
        }  
      }).catch((err) => {
          statusalert.setTitle('Error');
          statusalert.setSubTitle('Tu foto no ha sido cambiada');
          statusalert.present();
      })
      })
  }
 
    editname() {
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      let alert = this.alertCtrl.create({
        title: 'Editar Usuario',
        inputs: [{
          name: 'usuario',
          placeholder: 'usuario'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
   
          }
        },
        {
          text: 'Edit',
          handler: data => {
            if (data.usuario) {
              this.userservice.updatedisplayname(data.usuario).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your nickname has been changed successfully!!');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.usuario;
                  })
                }
   
                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your nickname was not changed');
                  statusalert.present();
                }
                               
              })
            }
          }
          
        }]
      });
      alert.present();
    }
  
  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('TabsPage');
    })
  }

  goBack(){
    this.navCtrl.pop();
  }
 
}