import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class PerfilPage implements OnInit {
  username: string = '';
  correoElectronico: string = '';
  tipoUsuario: string = '';
  modalOpen: boolean = false;

  // Datos para editar el perfil
  nuevoNombreUsuario: string = '';
  nuevaContrasena: string = '';

  constructor(private authService: AuthService, private modalController: ModalController) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  // Función para cargar los datos del usuario desde AuthService
  cargarDatosUsuario() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.username = usuario.nombre;
      this.correoElectronico = usuario.correo;
      this.tipoUsuario = usuario.rol;
    }
  }

  // Función para abrir el modal de edición
  abrirModal() {
    this.modalOpen = true;
  }

  // Función para cerrar el modal de edición
  cerrarModal() {
    this.modalOpen = false;
  }

  // Función para guardar los cambios del perfil
  guardarCambios() {
    // Aquí puedes actualizar los datos del usuario a través del AuthService si tienes un backend
    const updatedUserData = {
      nombre: this.nuevoNombreUsuario,
      correo: this.correoElectronico,
      rol: this.tipoUsuario
    };
    
    // Actualizar el usuario en el servicio AuthService
    this.authService.actualizarUsuario(updatedUserData);

    // Actualizar las propiedades del componente
    this.username = this.nuevoNombreUsuario;

    this.cerrarModal();
  }

  // Función para cerrar sesión
  logout() {
    this.authService.logout();
    // Redirigir a la página de login (esto depende de cómo manejes la navegación)
  }
}
