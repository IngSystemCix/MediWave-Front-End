import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ComboboxComponent } from "../../../../../shared/components/combobox/combobox.component";

@Component({
  selector: 'app-modal-schedule-new-appointment',
  imports: [FormsModule, ComboboxComponent],
  templateUrl: './modal-schedule-new-appointment.component.html',
  styleUrls: ['./modal-schedule-new-appointment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalScheduleNewAppointmentComponent {
  @Input() specialists: string[] = [];
  @Input() isModalOpen = false;

  @Output() closeModalNewAppointment = new EventEmitter<void>();
  @Output() appointmentConfirmed = new EventEmitter<{
    specialist: string;
    date: string;
    time: string;
    reason: string;
  }>();

  protected currentStep = 1;
  protected selectedSpecialist = '';
  protected appointmentDate = '';
  protected consultationReason = '';
  protected appointmentTime: { name: string } | null = null;
  protected minDate = new Date().toISOString().split('T')[0];
  protected isDisableHour = true;

  get isNextDisabled(): boolean {
    if (this.currentStep === 1) {
      return !this.selectedSpecialist;
    }
    if (this.currentStep === 2) {
      return !this.appointmentDate || !this.appointmentTime;
    }
    return false;
  }

  get isConfirmDisabled(): boolean {
    return this.consultationReason.trim() === '';
  }

  validateTime(): void {
    if (!this.appointmentTime || !this.appointmentDate) {
      return;
    }

    const selectedHour = Number.parseInt(
      this.appointmentTime.name.split(':')[0],
      10
    );
    if (selectedHour < 8 || selectedHour > 18) {
      this.appointmentTime = null;
      return;
    }

    // Formatear la fecha y la hora seleccionada
    const selectedDate = new Date(`${this.appointmentDate}T00:00:00`);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    this.appointmentTime = {
      name: `${selectedDate.toLocaleDateString('es-ES', options)} a las ${
        this.appointmentTime
      }`,
    };
  }

  closeModal() {
    this.closeModalNewAppointment.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }

  goNext() {
    if (!this.isNextDisabled) {
      this.currentStep++;
    }
  }

  goPrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitAppointment() {
    if (!this.isConfirmDisabled) {
      this.appointmentConfirmed.emit({
        specialist: this.selectedSpecialist,
        date: this.appointmentDate,
        time: this.appointmentTime ? this.appointmentTime.name : '',
        reason: this.consultationReason,
      });
      this.closeModal();
    }
  }

  onDateChange(): void {
    this.isDisableHour = false;
  }
}
