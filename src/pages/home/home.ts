import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { UmakosPage } from '../umakos/umakos';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Ocultar1:boolean= true;
  infocard:boolean= true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public afireauth: AngularFireAuth, public mdlCtrl: ModalController,
  public toastCtrl: ToastController, public chatservice: ChatProvider) {
    
  }
  ionViewWillEnter(){
  var user = this.afireauth.auth.currentUser;
  if(user){
    this.Ocultar1 = false;
    }
  }
  
  LoginSingup(){
    var user = this.afireauth.auth.currentUser;
    if(user){
      this.Ocultar1 = false;
      this.navCtrl.push('TabsPage')
  }else{
    let openlogin = this.mdlCtrl.create('LoginPage');
    openlogin.present();
    }
  }

  enterprise(){
    let toaster = this.toastCtrl.create({
      message: 'Error dude',      
      position: 'buttom',
      showCloseButton: true, closeButtonText: 'OK',
      duration: 3000
    });
    toaster.setMessage('Realizamos entregas de documentos, mensajeria por horas, entrega de regalos empresariales');
    toaster.present();
  }

  personal(){
    let toaster = this.toastCtrl.create({
      message: 'Error dude',      
      position: 'buttom',
      showCloseButton: true, closeButtonText: 'OK',
      duration: 3000
    });
    toaster.setMessage('Hacemos tus tramites legales, tramites de salud, tales como diligencias de instrumentos publicos, transcipciones medicas, entrega de encomiendas, pagos, compra y entrega de productos');    
    toaster.present();
  }

  massive(){
    let toaster = this.toastCtrl.create({
      message: 'Error dude',      
      position: 'buttom',
      showCloseButton: true, closeButtonText: 'OK',
      duration: 3000
    });
    toaster.setMessage('Entrega de invitaciones a eventos, entrega de estados de cuenta');    
    toaster.present();
  }

  contact(){
    let toaster = this.toastCtrl.create({
      message: 'Error dude',      
      position: 'buttom',
      showCloseButton: true, closeButtonText: 'OK',
      duration: 5000
    });
    toaster.setMessage('Siguenos en facebook como @Mmandaos o en instagram como @makomandaos, nuestro WhatsApp es 3005786548, y nuestra pagina web en www.tumandao.co');    
    toaster.present();
  }

 
}
