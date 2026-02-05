import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  IonCheckbox,
  IonImg,
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import { AuthMockService } from '../../../../core/services/auth.mock.service';
import { ILoginRequest } from '../../../../models/auth.model';

/**
 * Página de Login - SPIO
 * Implementa autenticación con ReactiveForms y validaciones estrictas
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
    IonCheckbox,
    IonImg,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /** Inyección de dependencias */
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthMockService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly toastCtrl = inject(ToastController);
  private readonly alertCtrl = inject(AlertController);

  /** Formulario de login */
  loginForm!: FormGroup;

  /** Estado de visibilidad de contraseña */
  showPassword = false;

  /** Estado de carga */
  isLoading = false;

  constructor() {
    // Registrar iconos de Ionicons
    addIcons({
      personOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
      informationCircleOutline,
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.checkExistingSession();
  }

  /**
   * Inicializa el formulario con validaciones estrictas
   */
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      rememberMe: [false],
    });
  }

  /**
   * Verifica si ya existe una sesión activa
   */
  private checkExistingSession(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
    }
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Procesa el inicio de sesión
   */
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      await this.showToast('Por favor, completa todos los campos correctamente.', 'warning');
      return;
    }

    const credentials: ILoginRequest = {
      username: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe,
    };

    // Mostrar loading
    const loading = await this.loadingCtrl.create({
      message: 'Verificando credenciales...',
      spinner: 'crescent',
      cssClass: 'spio-loading',
    });
    await loading.present();
    this.isLoading = true;

    // Realizar login
    this.authService.login(credentials).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.isLoading = false;

        if (response.success) {
          await this.showToast(
            `¡Bienvenido, ${response.operator?.firstName}!`,
            'success'
          );
          this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
        } else {
          await this.showToast(response.message, 'danger');
        }
      },
      error: async (error) => {
        await loading.dismiss();
        this.isLoading = false;
        await this.showToast(
          'Error de conexión. Intenta nuevamente.',
          'danger'
        );
        console.error('Login error:', error);
      },
    });
  }

  /**
   * Muestra información de credenciales de demo
   */
  async showDemoCredentials(): Promise<void> {
    const credentials = this.authService.getDemoCredentials();
    
    const alert = await this.alertCtrl.create({
      header: 'Credenciales de Demostración',
      message: `
        <p><strong>Usuario:</strong> ${credentials.username}</p>
        <p><strong>Contraseña:</strong> ${credentials.password}</p>
      `,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
        {
          text: 'Usar credenciales',
          handler: () => {
            this.loginForm.patchValue({
              username: credentials.username,
              password: credentials.password,
            });
          },
        },
      ],
      cssClass: 'spio-alert',
    });

    await alert.present();
  }

  /**
   * Marca todos los campos del formulario como touched
   * para mostrar errores de validación
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  /**
   * Muestra un toast con el mensaje especificado
   */
  private async showToast(
    message: string,
    color: 'success' | 'warning' | 'danger'
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'spio-toast',
    });
    await toast.present();
  }

  /**
   * Getters para acceso fácil a los controles del formulario
   */
  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   */
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return control?.hasError(errorType) && control?.touched || false;
  }
}
