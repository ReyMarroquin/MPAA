import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class SensoresPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
