import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularResizedEventModule } from 'angular-resize-event';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent
  ],
  imports: [
    BrowserModule,
    AngularResizedEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
