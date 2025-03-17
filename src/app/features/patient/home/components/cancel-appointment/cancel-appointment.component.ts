import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancel-appointment',
  imports: [FormsModule],
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelAppointmentComponent {
  @Input() nameDoctor!: string;
  @Input() specialty!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Output() closeCancelAppointment = new EventEmitter<void>();

  protected reason = 'Conflicto de horario';
  protected otherReason = '';
  protected isDisableButtonCanceling = false;
  protected reasons: string[] = [
    'Conflicto de horario',
    'Me siento mejor',
    'Problemas de transporte',
    'Otro motivo',
  ];

  protected previewView(): void {
    this.closeCancelAppointment.emit();
  }

  protected onCancelAppointment(): void {
    this.closeCancelAppointment.emit();
  }

  protected onReasonChange(): void {
    if (this.reason === 'Otro motivo') {
      this.isDisableButtonCanceling = this.otherReason.trim() === '';
    } else {
      this.isDisableButtonCanceling = false; // Si se elige otro motivo, el botón se habilita
    }
  }
}
