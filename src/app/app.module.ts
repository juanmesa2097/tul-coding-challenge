import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiNotificationsModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiNotificationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
