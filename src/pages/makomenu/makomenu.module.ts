import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakomenuPage } from './makomenu';

@NgModule({
  declarations: [
    MakomenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MakomenuPage),
  ],
})
export class MakomenuPageModule {}
