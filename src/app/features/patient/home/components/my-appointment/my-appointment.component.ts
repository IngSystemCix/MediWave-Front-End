import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TableWithTabsComponent } from "../../../../../shared/components/table-with-tabs/table-with-tabs.component";
import { TabComponent } from "../../../../../shared/components/tab/tab.component";
import { AvatarComponent } from "../../../../../shared/components/avatar/avatar.component";
import { NgClass } from '@angular/common';
import { TabsComponent } from "../../../../../shared/components/tabs/tabs.component";
import { MapComponent } from "../../../../../shared/components/map/map.component";

interface MyAppointmentProps {
  numberAppointment: string;
  study: string;
  status: 'Confirmada' | 'Programada' | 'Completa';
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
  [key: string]: unknown;
}

@Component({
  selector: 'app-my-appointment',
  imports: [
    TableWithTabsComponent,
    TabComponent,
    AvatarComponent,
    NgClass,
    TabsComponent,
    MapComponent,
  ],
  templateUrl: './my-appointment.component.html',
  styleUrl: './my-appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAppointmentComponent {
  @Output() closedMyAppointment = new EventEmitter<void>();
  protected columnsMyAppountment: { field: string; header: string }[] = [
    { field: 'nameDoctor', header: 'Médico' },
    { field: 'specialty', header: 'Especialidad' },
    { field: 'numberAppointment', header: 'Número de Cita' },
    { field: 'study', header: 'Estudio' },
    { field: 'status', header: 'Estado' },
    { field: 'date', header: 'Fecha' },
    { field: 'hour', header: 'Hora' },
    { field: 'location', header: 'Ubicación' },
    { field: 'street', header: 'Calle' },
    { field: 'directionsToThePlace', header: 'Indicaciones' },
    { field: 'preparation', header: 'Preparación' },
    { field: 'notes', header: 'Notas' },
    { field: 'numberPhoneDoctor', header: 'Teléfono del Médico' },
    { field: 'emailDoctor', header: 'Email del Médico' },
  ];
  protected myAppointments: MyAppointmentProps[] = [
    {
      numberAppointment: 'Cita #AP-2025-0311',
      study: 'Resonancia magnética cerebral',
      status: 'Programada',
      date: 'Jueves, 11 de marzo de 2025',
      hour: '2:30 PM',
      location: 'Hospital Central',
      street: 'Avenida 10 # 15-20',
      directionsToThePlace: 'Edificio azul, segundo piso',
      preparation: [
        'No consumir cafeína 12 horas antes',
        'No usar maquillaje ni joyas',
      ],
      notes: 'Llegar 30 minutos antes para el registro',
      nameDoctor: 'Dr. Luis Gómez',
      specialty: 'Neurología',
      numberPhoneDoctor: '+57 311 456 7890',
      emailDoctor: 'luis_gomez@gmail.com',
      center: { lat: 4.60971, lng: -74.08175 },
    },
    {
      numberAppointment: 'Cita #AP-2025-0312',
      study: 'Examen de sangre',
      status: 'Confirmada',
      date: 'Viernes, 12 de marzo de 2025',
      hour: '8:00 AM',
      location: 'Laboratorio Santa Fe',
      street: 'Carrera 7 # 45-32',
      directionsToThePlace: 'Frente al parque principal',
      preparation: ['Ayuno de 12 horas', 'Beber solo agua en la mañana'],
      notes: 'Llevar documento de identidad',
      nameDoctor: 'Dra. Carolina Pérez',
      specialty: 'Medicina General',
      numberPhoneDoctor: '+57 320 789 6543',
      emailDoctor: 'carolina_perez@gmail.com',
      center: { lat: 4.63451, lng: -74.07209 },
    },
    {
      numberAppointment: 'Cita #AP-2025-0313',
      study: 'Rayos X de tórax',
      status: 'Completa',
      date: 'Sábado, 13 de marzo de 2025',
      hour: '10:45 AM',
      location: 'Clínica Los Olivos',
      street: 'Calle 50 # 20-18',
      directionsToThePlace: 'Al lado del supermercado Éxito',
      preparation: [
        'Usar ropa holgada',
        'Evitar cremas o lociones en el pecho',
      ],
      notes: 'Reprogramar en caso de gripe o tos',
      nameDoctor: 'Dr. Jorge Ramírez',
      specialty: 'Radiología',
      numberPhoneDoctor: '+57 301 258 9637',
      emailDoctor: 'jorge_ramirez@gmail.com',
      center: { lat: 4.65789, lng: -74.09234 },
    },
  ];
  protected viewExtraInfo = false;
  protected selectedMyAppointment: MyAppointmentProps | null = null;

  closeMyAppointment(): void {
    this.closedMyAppointment.emit();
  }

  toggleExtraInfo(myAppointment: MyAppointmentProps) {
    this.selectedMyAppointment = myAppointment;
    this.viewExtraInfo = true;
  }

  hideExtraInfo() {
    this.viewExtraInfo = false;
    this.selectedMyAppointment = null;
  }

  backToMyAppointments() {
    this.hideExtraInfo();
  }

  protected optionsMap = {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };
}
