import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { email } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: 'login.component.html',
})
export class Login {
  
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private route = inject(Router);

  wrongCredentials = signal<string | null>(null);

  loginForm:FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });

  ingresar():void {

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    if(this.loginForm.invalid){
      return
    }

    const{email,password} = this.loginForm.value;

    this.authService.login(email,password).subscribe({
      next:(data)=>{
        if(data){
          this.route.navigate(['inicio']);
        }else{
          this.wrongCredentials.set('Usuario o contraseña incorrecta');
          this.loginForm.reset();
        }
      }
    })

  }
}
