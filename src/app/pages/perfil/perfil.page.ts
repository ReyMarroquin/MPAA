import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class PerfilPage implements OnInit {
  username: string = 'Rey Marro';  // Replace with the actual username or fetch it from an API/service
  tipoUsuario: string = 'Administrador';  // Replace with the actual user type or fetch it dynamically

  constructor() { }

  ngOnInit() {
  }
  
  logout(){

  }

}
