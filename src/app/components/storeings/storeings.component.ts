import { Component, OnInit, ViewChild } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
@Component({
  selector: 'app-storeings',
  templateUrl: './storeings.component.html',
  styleUrls: ['./storeings.component.css'],
})
export class StoreingsComponent implements OnInit {
    id;
    name;
    priceonce;
    numnow;
    newNumNow;
    numsell;
    newNumSell;
    by;
    storeings:any;
    oncestore:any;
    @ViewChild('modaladd')
    modaladd: ModalComponent;
    @ViewChild('modalsell')
    modalsell: ModalComponent;
    searchData;
    filterargs;
    userFilter: any = { name: '' };
    btnDel: boolean = false;
    idCheck = [];

  	constructor(
        private firebaseService:FirebaseService,
        public flashMessage:FlashMessagesService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

  	ngOnInit() {
    		this.firebaseService.getstores().subscribe(storeings => {
          this.storeings = storeings;
      	});
  	}

    del(){
      var data = this.idCheck;
      var firebaseService = this.firebaseService;
      var flashMessage = this.flashMessage;
      var r = confirm("ยืนยันการลบ!"+data.length+" รายการ");
      if (r == true) {
          this.btnDel = !this.btnDel;
          // console.log(data.length)
          data.forEach(function(id,i){
              firebaseService.deleteStoreing(id);
              console.log(i++ === data.length)
              if(i++ === data.length){
                  flashMessage.show('ลบข้อมูล '+data.length+' รายการเรียบร้อย',
                  {cssClass: 'alert-success', timeout: 3000});
              }
          });
      }else{
          this.Undel();
      }
    }

    Undel(){
      this.idCheck = [];
      this.btnDel = !this.btnDel;
    }

    addNumNow(oncestore){
        this.id = oncestore.$key;
        this.name = oncestore.name;
        this.priceonce = oncestore.priceonce;
        this.numnow = oncestore.numnow;
        this.by = oncestore.by;
        this.modaladd.open();
    }

    onAddSubmit(){

      let storeing = {
          numnow: this.numnow+this.newNumNow,
          by: this.by
      }
      this.firebaseService.updateStoreing(this.id, storeing);
      this.modaladd.close();
      this.flashMessage.show('อัพเดตรายการ '+this.name +
          'จาก '+(this.numnow)+' หน่วย เป็น '+(this.numnow+this.newNumNow)+' หน่วย',
          {cssClass: 'alert-success', timeout: 3000});
    }

    numSell(oncestore){
        this.id = oncestore.$key;
        this.name = oncestore.name;
        this.priceonce = oncestore.priceonce;
        this.numnow = oncestore.numnow;
        this.numsell = oncestore.numsell;
        this.by = oncestore.by;
        this.modalsell.open();
    }

    numSellSubmit(){
      let storeing = {
          numnow: this.numnow-this.newNumSell,
          numsell: this.numsell+this.newNumSell,
      }
      this.firebaseService.updateStoreing(this.id, storeing);

      this.modalsell.close();
      this.flashMessage.show('อัพเดตรายการ '+this.name +
          'จาก '+this.numnow+' หน่วย เป็น '+(this.numnow-this.newNumSell)+' หน่วย',
          {cssClass: 'alert-success', timeout: 3000});
    }
}   
