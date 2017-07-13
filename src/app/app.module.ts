import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { StoreingsComponent } from './components/storeings/storeings.component';
import { StoreingComponent } from './components/storeing/storeing.component';
import { AddStoreingComponent } from './components/add-storeing/add-storeing.component';
import { EditStoreingComponent } from './components/edit-storeing/edit-storeing.component';

export const firebaseConfig = {
    apiKey: "AIzaSyDdmmVREBEeAkZpG8HCxVZ2P5PRcQPWa30",
    authDomain: "storefather-ec5dd.firebaseapp.com",
    databaseURL: "https://storefather-ec5dd.firebaseio.com",
    projectId: "storefather-ec5dd",
    storageBucket: "storefather-ec5dd.appspot.com",
    messagingSenderId: "137894969507"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'listings', component:ListingsComponent},
  {path:'listing/:id', component:ListingComponent},
  {path: 'add-listing', component:AddListingComponent},
  {path: 'add-storeing', component:AddStoreingComponent},
  {path:'edit-listing/:id', component:EditListingComponent},
  {path:'storeings', component:StoreingsComponent},
  {path:'storeing/:id', component:StoreingComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    StoreingsComponent,
    StoreingComponent,
    AddStoreingComponent,
    EditStoreingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
