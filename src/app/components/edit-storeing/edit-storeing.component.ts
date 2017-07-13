import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-edit-storeing',
  templateUrl: './edit-storeing.component.html',
  styleUrls: ['./edit-storeing.component.css']
})
export class EditStoreingComponent implements OnInit {
	id;
	name:any;
	priceonce:any;
	numnow:any;
	numsell:any;
	by:any;
  	constructor(
  		private firebaseService:FirebaseService,
	    private router: Router,
	    private route: ActivatedRoute
	) { }

  	ngOnInit() {
  		this.id = this.route.snapshot.params['id'];

    	this.firebaseService.getStoreingDetails(this.id).subscribe(data => {
	      	this.name = data.name;
	      	this.priceonce = data.priceonce;
	      	this.numnow = data.numnow;
	      	this.numsell = data.numsell;
	      	this.by = data.by;
	    });
  	}

  	onEditSubmit(){
    let storeing = {
        name: this.name,
        priceonce: this.priceonce,
        numnow: this.numnow,
        numsell: this.numsell,
        by: this.by
    }
    console.log(storeing)
    this.firebaseService.updateStoreing(this.id, storeing);

    this.router.navigate(['/storeing/'+this.id]);
  	}
      	

}
