import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { config } from './app.firebaseconfig';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
 
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth'
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestProvider } from '../providers/request/request';
import { ChatProvider } from '../providers/chat/chat';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',
    scrollAssist: false,
    autoFocusAssist: false,
    tabsHighlight: true}),
    AngularFireModule.initializeApp(config) ,
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File, 
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    RequestProvider,
    ChatProvider,
    LocalNotifications
  ]
})
export class AppModule {}