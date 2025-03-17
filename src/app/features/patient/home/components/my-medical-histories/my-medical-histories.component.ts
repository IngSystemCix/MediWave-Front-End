import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-medical-histories',
  imports: [],
  templateUrl: './my-medical-histories.component.html',
  styleUrl: './my-medical-histories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMedicalHistoriesComponent {
  @Output() closedMyMedicalHistories = new EventEmitter<void>();

  closeMyMedicalHistories(): void {
    this.closedMyMedicalHistories.emit();
  }
}
