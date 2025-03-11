import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-luces',
  templateUrl: './control-luces.page.html',
  styleUrls: ['./control-luces.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class ControlLucesPage implements OnInit {

  luces: Record<number, boolean> = { 1: false, 2: false };

  toggleLuz(id: number) {
  this.luces[id] = !this.luces[id];
  }


  constructor() { }

  ngOnInit() {
  }

}
