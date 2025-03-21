import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.page.html',
  styleUrls: ['./conocenos.page.scss'],
  imports:[IonicModule,CommonModule,RouterModule],
  standalone:true
})
export class ConocenosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
