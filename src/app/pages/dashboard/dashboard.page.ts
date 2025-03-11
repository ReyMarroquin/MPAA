import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class DashboardPage implements OnInit {

  constructor() { }

  temperatura: number = 25;
  calidadAire: string = 'Buena';
  ruido: number = 30;

  ngOnInit() {
  }

}
