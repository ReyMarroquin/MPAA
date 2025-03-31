import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import * as auth from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { User as FirebaseUser } from '@firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null;
  private loginError: string = '';
  private authState = new BehaviorSubject<boolean>(false);
  

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.cargarUsuario();
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return !!this.usuario;
  }

  // Observable para escuchar cambios de autenticación
  get authState$() {
    return this.authState.asObservable();
  }

  // Método para realizar el login con Firebase
  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      
      if (result.user) {
        this.usuario = {
          nombre: result.user.displayName || email.split('@')[0],
          correo: result.user.email,
          rol: this.determinarRol(result.user.email) // Puedes implementar tu lógica de roles
        };
        
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.authState.next(true);
        return true;
      }
      return false;
    } catch (error: any) {
      this.loginError = this.translateFirebaseError(error.code);
      return false;
    }
  }

  

  // Método para registrar un nuevo usuario
  async register(email: string, password: string, nombre: string): Promise<boolean> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      if (result.user) {
        // Actualizar el perfil del usuario con el nombre
        await result.user.updateProfile({ displayName: nombre });
        
        this.usuario = {
          nombre: nombre,
          correo: email,
          rol: 'usuario' // Rol por defecto para nuevos usuarios
        };
        
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.authState.next(true);
        return true;
      }
      return false;
    } catch (error: any) {
      this.loginError = this.translateFirebaseError(error.code);
      return false;
    }
  }

  // Método para obtener la redirección por defecto según el rol
  getDefaultRedirectForRole(rol: string): string {
    switch (rol) {
      case 'admin':
        return '/control-luces';
      case 'usuario':
        return '/dashboard';
      default:
        return '/home';
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error: any) {
      console.error('Error al enviar correo de recuperación:', error);
      throw error;
    }
  }

  getLoginError(): string {
    return this.loginError;
  }

  // Método para cargar usuario desde Firebase
  private async cargarUsuario() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        this.usuario = {
          nombre: user.displayName || user.email?.split('@')[0],
          correo: user.email,
          rol: this.determinarRol(user.email)
        };
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.authState.next(true);
      } else {
        const datos = localStorage.getItem('usuario');
        this.usuario = datos ? JSON.parse(datos) : null;
        this.authState.next(!!this.usuario);
      }
    } catch (error) {
      console.error('Error al cargar usuario', error);
      this.usuario = null;
      this.authState.next(false);
    }
  }

  

  // Obtener el usuario logueado
  getUsuario() {
    return this.usuario;
  }

  // Obtener el rol del usuario
  getRol(): string {
    return this.usuario?.rol || 'invitado';
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      this.usuario = null;
      localStorage.removeItem('usuario');
      this.authState.next(false);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
  

  // Método para actualizar los datos del usuario
  async actualizarUsuario(updatedUserData: any) {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        if (updatedUserData.nombre) {
          await user.updateProfile({ displayName: updatedUserData.nombre });
        }
        
        this.usuario = { ...this.usuario, ...updatedUserData };
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      }
    } catch (error) {
      console.error('Error al actualizar usuario', error);
    }
  }
  

  

  // Determinar rol basado en el email (puedes personalizar esta lógica)
  private determinarRol(email?: string | null): string {
    if (!email) return 'invitado';
    
    // Ejemplo: si el email contiene 'admin' o está en una lista de admins
    if (email.includes('admin') || email === 'admin@mpa.com') {
      return 'admin';
    }
    return 'usuario';
  }

  // Traducir errores de Firebase a mensajes amigables
  private translateFirebaseError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Correo electrónico no válido';
      default:
        return 'Error al autenticar. Por favor, inténtalo de nuevo.';
    }
  }

  async googleLogin(): Promise<any> {
    const provider = new GoogleAuthProvider();
    
    if (Capacitor.isNativePlatform()) {
      try {
        await Browser.open({ 
          url: `https://mpaa-9efab.firebaseapp.com/__/auth/handler?provider=google.com`, 
          windowName: '_self'   
        });
        
        const result = await this.afAuth.getRedirectResult();
        if (result.user) {
          await this.handleSocialLoginSuccess(result.user);
          return result.user;
        }
        return null;
      } catch (error) {
        console.error('Error en login con Google:', error);
        throw error;
      }
    } else {
      try {
        const result = await this.afAuth.signInWithPopup(provider);
        await this.handleSocialLoginSuccess(result.user);
        return result.user;
      } catch (error) {
        console.error('Error en login con Google:', error);
        throw error;
      }
    }
  }

  // Nuevo método para Facebook Login
  async facebookLogin(): Promise<any> {
    const provider = new FacebookAuthProvider();
    provider.addScope('email'); // Solicitar acceso al email

    if (Capacitor.isNativePlatform()) {
      try {
        await Browser.open({
          url: `https://mpaa-9efab.firebaseapp.com/__/auth/handler`,
          windowName: '_self'
        });

        const result = await this.afAuth.getRedirectResult();
        if (result.user) {
          await this.handleSocialLoginSuccess(result.user);
          return result.user;
        }
        return null;
      } catch (error) {
        console.error('Error en login con Facebook:', error);
        throw error;
      }
    } else {
      try {
        const result = await this.afAuth.signInWithPopup(provider);
        await this.handleSocialLoginSuccess(result.user);
        return result.user;
      } catch (error) {
        console.error('Error en login con Facebook:', error);
        throw this.translateFacebookError(error);
      }
    }
  }

  private async handleSocialLoginSuccess(user: any) {
    this.usuario = {
      nombre: user.displayName || user.email?.split('@')[0],
      correo: user.email,
      rol: this.determinarRol(user.email),
      providerData: user.providerData // Guarda info del proveedor (Facebook/Google)
    };
    
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.authState.next(true);
    await this.router.navigate(['/dashboard']);
  }

  private translateFacebookError(error: any): string {
    const errorCode = error.code || error.message;
    switch (errorCode) {
      case 'auth/account-exists-with-different-credential':
        return 'Este email ya está registrado con otro método';
      case 'auth/popup-closed-by-user':
        return 'Ventana de login cerrada';
      case 'auth/facebook-auth/access-denied':
        return 'Acceso denegado por Facebook';
      default:
        return 'Error al autenticar con Facebook';
    }
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(
      (user) => { // Sin especificar tipo explícito
        if (user) {
          this.handleAuthenticatedUser(user);
        } else {
          this.handleUnauthenticatedUser();
        }
      },
      (err) => {
        console.error('Auth error:', err);
        this.handleUnauthenticatedUser();
      }
    );
  }
  
  private handleAuthenticatedUser(user: any) {
    this.usuario = {
      nombre: user.displayName || user.email?.split('@')[0],
      correo: user.email,
      rol: this.determinarRol(user.email),
      uid: user.uid,
      photoURL: user.photoURL
    };
    
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.authState.next(true);
    this.router.navigate([this.getDefaultRedirectForRole(this.usuario.rol)]);
  }
  
  private handleUnauthenticatedUser() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.authState.next(false);
  }

  // Añade este método para mantener consistencia
getUserRole(): string {
  return this.getRol(); // Ya que tienes getRol() definido
}

// Asegúrate que logout() limpie todo correctamente

}