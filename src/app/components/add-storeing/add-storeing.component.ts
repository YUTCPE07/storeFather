import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-storeing',
  templateUrl: './add-storeing.component.html',
  styleUrls: ['./add-storeing.component.css']
})
export class AddStoreingComponent implements OnInit {
	name:any;
	priceonce:any;
	numnow:any;
	numsell:any;
	by:any;

  	constructor(
  		private firebaseService:FirebaseService,
    	private router:Router
	){ }

  	ngOnInit() {
  	}

  	onAddSubmit(){
	    let storeing = {
	      name: this.name,
	      priceonce: this.priceonce,
	      numnow: this.numnow,
	      numsell:0,
	      by: this.by
	    }

	    this.firebaseService.addStoreing(storeing);

    	this.router.navigate(['storeings']);
    }
}
