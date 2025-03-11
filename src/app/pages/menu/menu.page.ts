import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]
})
export class MenuPage implements OnInit {
  isAdmin = false; // Cambiar según autenticación

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
