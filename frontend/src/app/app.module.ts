import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';

@NgModule({
  imports: [
    BrowserModule,
 ],
  bootstrap: [App]
})
export class AppModule {}
