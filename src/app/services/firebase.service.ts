import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  storeings: FirebaseListObservable<any[]>
  listing: FirebaseObjectObservable<any>;
  storeing: FirebaseObjectObservable<any>;
  folder: any;

  constructor(private af: AngularFire) {
    this.folder = 'listingimages';
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>
    this.storeings = this.af.database.list('/store') as FirebaseListObservable<Storeing[]>
  }
  // constructorStores(private af: AngularFire){
    
  // }

  getListings(){
    return this.listings;
  }

  getstores(){
    return this.storeings;
  }

  getListingDetails(id){
    this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }

  getStoreingDetails(id){
    this.storeing = this.af.database.object('/store/'+id) as FirebaseObjectObservable<Storeing>
    return this.storeing;
  }

  addListing(listing){
    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }

  addStoreing(storeing){
    return this.storeings.push(storeing);
  }

  updateListing(id, listing){
    return this.listings.update(id, listing);
  }

  updateStoreing(id, storeing){
    return this.storeings.update(id, storeing);
  }

  deleteListing(id){
    return this.listings.remove(id);
  }

}

interface Storeing{
  $key?:string;
  name?:string;
  numnow?:string;
  numsell?:string;
  piceonce?:string;
  by?:string;
}

interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}
