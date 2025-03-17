import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-attendance',
  imports: [FormsModule],
  templateUrl: './confirm-attendance.component.html',
  styleUrl: './confirm-attendance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAttendanceComponent {
  @Input() nameDoctor!: string;
  @Input() specialty!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Input() location!: string;
  @Input() street!: string;
  @Output() closeConfirmAttendance = new EventEmitter<void>();

  protected confirmReminder = true;
  protected reminder = '1 día antes';

  protected reminders: string[] = [
    '1 día antes',
    '2 horas antes',
    '1 semana antes',
  ];

  previewView(): void {
    this.closeConfirmAttendance.emit();
  }

  confirmAttendance(): void {
    this.closeConfirmAttendance.emit();
  }
}
