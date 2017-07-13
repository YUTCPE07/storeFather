import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-storeing',
  templateUrl: './storeing.component.html',
  styleUrls: ['./storeing.component.css']
})
export class StoreingComponent implements OnInit {
	id:any;
  	storeing: any;
  	constructor(
  		private firebaseService: FirebaseService,
	    private router:Router,
	    private route:ActivatedRoute
	){}

  	ngOnInit() {
  		this.id = this.route.snapshot.params['id'];
  		this.firebaseService.getStoreingDetails(this.id).subscribe(storeing => {
  			console.log(storeing);
	      	this.storeing = storeing;
	    });
  	}

  	onDeleteClick(){
  		var r = confirm("ยืนยันการลบ!");
		if (r == true) {
	  		this.firebaseService.deleteStoreing(this.id);
		    this.router.navigate(['/storeings']);
		}
  		
  	}
}
