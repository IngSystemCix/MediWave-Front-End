import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsComponent } from "../../../../../shared/components/tabs/tabs.component";
import { TabComponent } from "../../../../../shared/components/tab/tab.component";
import { AvatarComponent } from "../../../../../shared/components/avatar/avatar.component";
import { MapComponent } from "../../../../../shared/components/map/map.component";

@Component({
  selector: 'app-next-appointment',
  imports: [TabsComponent, TabComponent, AvatarComponent, MapComponent],
  templateUrl: './next-appointment.component.html',
  styleUrl: './next-appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextAppointmentComponent {
  @Input() numberAppointment!: string;
  @Input() study!: string;
  @Input() status!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Input() location!: string;
  @Input() directionsToThePlace!: string;
  @Input() preparation!: string[];
  @Input() notes!: string;
  @Input() nameDoctor!: string;
  @Input() specialty!: string;
  @Input() numberPhoneDoctor!: string;
  @Input() emailDoctor!: string;
  @Input() street!: string;
  @Input() center!: google.maps.LatLngLiteral;
  @Input() optionsMap!: google.maps.MapOptions;
  @Output() closeAppointmentEmitter = new EventEmitter<void>();

  closeAppointment() {
    this.closeAppointmentEmitter.emit();
  }
}
