import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from "../../../../../shared/components/combobox/combobox.component";
import { format } from '@formkit/tempo';

@Component({
  selector: 'app-reschedule-appointment',
  imports: [FormsModule, ComboboxComponent],
  templateUrl: './reschedule-appointment.component.html',
  styleUrl: './reschedule-appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RescheduleAppointmentComponent {
  @Input() nameDoctor!: string;
  @Input() specialty!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Output() closeRescheduleAppointment = new EventEmitter<void>();

  protected selectedHour!: { name: string };
  protected newDate!: string;
  protected isDisabledHour = true;
  protected minDate = new Date().toISOString().split('T')[0];
  protected isDisabledContinue = true;
  protected isVisiblePanelReasonForReschedule = false;
  protected reason!: string;
  protected isConfirmRescheduleAppointment = true;

  previewView(): void {
    this.closeRescheduleAppointment.emit();
  }

  protected onDateChange(): void {
    this.isDisabledHour = false;
  }

  protected getNewDate(): string {
    const date = new Date(`${this.newDate}T00:00:00`);
    return format(date, 'full', 'es');
  }

  protected onContinueReasonForReschedule(): void {
    this.isVisiblePanelReasonForReschedule = true;
  }

  protected backToReschedule(): void {
    this.isVisiblePanelReasonForReschedule = false;
  }

  protected onConfirmReschedule(): void {
    this.closeRescheduleAppointment.emit();
  }

  protected onReasonChange(): void {
    this.isConfirmRescheduleAppointment = this.reason.trim() === '';
  }
}
