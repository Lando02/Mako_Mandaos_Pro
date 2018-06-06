import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakochatPage } from './makochat';

@NgModule({
  declarations: [
    MakochatPage,
  ],
  imports: [
    IonicPageModule.forChild(MakochatPage),
  ],
})
export class MakochatPageModule {}
