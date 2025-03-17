import { passwordMatchValidator } from '@/utils/password-match.validator';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface RecoverPasswordFormProps {
  dni: FormControl<string>;
  codeVerification: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPasswordComponent implements OnInit {
  protected recoverPasswordForm: FormGroup<RecoverPasswordFormProps>;
  protected isCodeSent = true;
  protected isCodeVerified = true;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.recoverPasswordForm = this.fb.nonNullable.group(
      {
      dni: new FormControl<string>({value: '', disabled: false}, {
        nonNullable: true,
        validators: [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/),
        Validators.maxLength(8),
        ],
      }),
      codeVerification: new FormControl<string>(
        { value: '', disabled: true },
        {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
          Validators.maxLength(6),
        ],
        }
      ),
      password: new FormControl<string>(
        { value: '', disabled: true },
        {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
        }
      ),
      confirmPassword: new FormControl<string>(
        { value: '', disabled: true },
        {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
        }
      ),
      },
      { validators: passwordMatchValidator, updateOn: 'change' }
    );
  }

  ngOnInit(): void {
    this.recoverPasswordForm.controls.codeVerification.disable();
    this.recoverPasswordForm.controls.password.disable();
    this.recoverPasswordForm.controls.confirmPassword.disable();
  }

  getCodeVerification(): void {
    if (this.recoverPasswordForm.controls.dni.valid) {
      console.log('Obteniendo código de verificación...');
      this.recoverPasswordForm.controls.codeVerification.enable();
      this.recoverPasswordForm.controls.dni.disable();
      this.isCodeSent = false;
    } else {
      console.log('DNI inválido, no se puede obtener el código.');
      this.isCodeSent = true;
    }
  }

  dniInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  codeVerificationInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  recoverPassword(): void {
    if (this.recoverPasswordForm.valid) {
      console.log('Formulario válido:', this.recoverPasswordForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  codeVerification(): void {
    console.log('Código de verificación');
    if (
      this.recoverPasswordForm.controls.codeVerification.valid &&
      this.recoverPasswordForm.controls.codeVerification.value === '123456'
    ) {
      this.recoverPasswordForm.controls.codeVerification.disable();
      this.recoverPasswordForm.controls.password.enable();
      this.recoverPasswordForm.controls.confirmPassword.enable();
      this.isCodeVerified = false;
    } else {
      this.recoverPasswordForm.controls.password.disable();
      this.recoverPasswordForm.controls.confirmPassword.disable();
      this.isCodeVerified = true;
    }
  }
}
