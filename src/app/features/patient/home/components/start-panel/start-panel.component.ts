import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { MedicationsHistoryComponent } from "../medications-history/medications-history.component";
import { NextAppointmentComponent } from "../next-appointment/next-appointment.component";
import { RequestMedicationComponent } from "../request-medication/request-medication.component";
import { RescheduleAppointmentComponent } from "../reschedule-appointment/reschedule-appointment.component";
import { CancelAppointmentComponent } from "../cancel-appointment/cancel-appointment.component";
import { ConfirmAttendanceComponent } from "../confirm-attendance/confirm-attendance.component";

interface NextAppointmentProps {
  numberAppointment: string;
  study: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  date: string;
  hour: string;
  location: string;
  street: string;
  directionsToThePlace: string;
  preparation: string[];
  notes: string;
  nameDoctor: string;
  specialty: string;
  numberPhoneDoctor: string;
  emailDoctor: string;
  center: google.maps.LatLngLiteral;
}

interface MyMedicationsProps {
  name: string;
  amount: string;
  frequency: string;
  duration: string;
}

@Component({
  selector: 'app-start-panel',
  imports: [
    MedicationsHistoryComponent,
    RequestMedicationComponent,
    NextAppointmentComponent,
    RescheduleAppointmentComponent,
    CancelAppointmentComponent,
    ConfirmAttendanceComponent
],
  templateUrl: './start-panel.component.html',
  styleUrl: './start-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPanelComponent {
  @Input() isInfoPanelVisible!: boolean;
  @Input() isNextAppointment!: boolean;
  @Input() isMedications!: boolean;

  protected nextAppointments: NextAppointmentProps = {
    numberAppointment: 'Cita #AP-2025-0310',
    study: 'Electrocardiograma',
    status: 'Confirmada',
    date: '10 de Marzo, 2025',
    hour: '08:00 AM',
    location: 'Hospital General',
    street: 'Av. Principal',
    directionsToThePlace: 'Planta 3, Consulta 302',
    preparation: ['No comer 12 horas antes', 'No tomar agua 4 horas antes'],
    notes:
      'Paciente con historial de hipertensión. Última visita hace 12 meses.',
    nameDoctor: 'Dr. Juan Perez',
    specialty: 'Cardiologia',
    numberPhoneDoctor: '1234567890',
    emailDoctor: 'juan_perez@gamil.com',
    center: { lat: -6.7637954, lng: -79.8634243 },
  };

  protected optionsMap = {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  protected myMedications: MyMedicationsProps[] = [
    {
      name: 'Amoxicilina',
      amount: '500mg',
      frequency: 'Cada 8 horas',
      duration: '10 días',
    },
    {
      name: 'Paracetamol',
      amount: '500mg',
      frequency: 'Cada 6 horas',
      duration: '5 días',
    },
    {
      name: 'Ibuprofeno',
      amount: '400mg',
      frequency: 'Cada 12 horas',
      duration: '3 días',
    },
  ];

  protected isViewMedications = false;
  protected isViewMedicationsHistory = false;
  protected isRequestMedication = false;
  protected isNextAppointmentVisible = false;

  protected selectedButtonNextAppointment = 'view';

  // Methods

  onViewAppointment(): void {
    this.isNextAppointmentVisible = !this.isNextAppointmentVisible;
  }

  onCloseAppointment(): void {
    this.isNextAppointmentVisible = false;
  }

  onViewMedications(): void {
    this.isViewMedications = !this.isViewMedications;
  }

  closableViewMedications(): void {
    this.isViewMedications = false;
  }

  onViewMedicationsHistory(): void {
    this.isViewMedicationsHistory = !this.isViewMedicationsHistory;
  }

  backViewMedicationsHistory(): void {
    this.isViewMedicationsHistory = false;
  }

  onRequestMedication(): void {
    this.isRequestMedication = !this.isRequestMedication;
  }

  onRescheduleAppointment(): void {
    this.selectedButtonNextAppointment = 'reschedule';
  }

  onCancelAppointment(): void {
    this.selectedButtonNextAppointment = 'cancel';
  }

  onConfirmAttendance(): void {
    this.selectedButtonNextAppointment = 'confirm';
  }

  closeRescheduleAppointment(): void {
    this.selectedButtonNextAppointment = 'view';
  }

  closeCancelAppointment(): void {
    this.selectedButtonNextAppointment = 'view';
  }

  closeConfirmAttendance(): void {
    this.selectedButtonNextAppointment = 'view';
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.isViewMedications = false;
    this.isNextAppointmentVisible = false;
    this.isRequestMedication = false;
    this.isViewMedicationsHistory = false;
    this.closeRescheduleAppointment();
    this.closeCancelAppointment();
    this.closeConfirmAttendance();
  }
}
