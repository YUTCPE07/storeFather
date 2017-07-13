import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-storeings',
  templateUrl: './storeings.component.html',
  styleUrls: ['./storeings.component.css']
})
export class StoreingsComponent implements OnInit {
    id;
    name;
    priceonce;
    numnow;
    newNumNow;
    numsell;
    by;
    storeings:any;
    oncestore:any;
  	constructor(
        private firebaseService:FirebaseService,
        public flashMessage:FlashMessagesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    showhidepregnant: boolean;

  	ngOnInit() {
  		this.firebaseService.getstores().subscribe(storeings => {
      	console.log(storeings);
      	this.storeings = storeings;
    	});
  	}

    addNumNow(oncestore){
        console.log(oncestore)
        this.id = oncestore.$key;
        this.name = oncestore.name;
        this.priceonce = oncestore.priceonce;
        this.numnow = oncestore.numnow;
        this.by = oncestore.by;
        // this.flashMessage.show('addNumNow',
        // {cssClass: 'alert-success', timeout: 3000});
    }

    onAddSubmit(){

      let storeing = {
          // name: this.name,
          // priceonce: this.priceonce,
          numnow: this.numnow+this.newNumNow,
          // numsell: this.numsell,
          by: this.by
      }
      this.firebaseService.updateAddNumNow(this.id, storeing);

      this.router.navigate(['/storeings']);
    }

}   
