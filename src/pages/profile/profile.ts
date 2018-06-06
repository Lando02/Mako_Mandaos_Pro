import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imgurl: '';
  moveon: true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
      public zone: NgZone, public userservice: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  chooseimage(){
    this.imgservice.uploadimage().then((uploadedurl: any)=>{
      this.zone.run(()=>{
        this.imgurl = uploadedurl;  
        this.moveon.valueOf;  
      })
    })
  }

  updateproceed(){
    this.userservice.updateimage(this.imgurl).then((res: any )=>{
      if (res.success){
        this.navCtrl.setRoot('TabsPage')
      }else{
        alert(res);
      }
    })
  }

  proceded(){
    this.navCtrl.setRoot('TabsPage')
  }

}
