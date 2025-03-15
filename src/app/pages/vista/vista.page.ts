import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.page.html',
  styleUrls: ['./vista.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class VistaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
