import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { UserModule } from './user/user.module';
import { RecordsModule } from './records/records.module';
import { RouterModule, Routes} from '@angular/router' 
import { HttpClientModule} from '@angular/common/http'
import { HttpService } from './http.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ng6-toastr-notifications'
import { FormsModule } from '@angular/forms';



export function provideConfig() {

}

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    RecordsModule,
    RouterModule.forRoot([
      {path:'home',component: HomeViewComponent},
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'*', component:HomeViewComponent }
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
