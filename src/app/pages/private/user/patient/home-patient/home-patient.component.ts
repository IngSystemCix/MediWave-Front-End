import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../../../../shared/components/navbar/navbar.component";
import { format } from '@formkit/tempo';
import { AvatarComponent } from "../../../../../shared/components/avatar/avatar.component";
import { NgClass } from '@angular/common';
import { StartPanelComponent } from "../../../../../features/patient/home/components/start-panel/start-panel.component";
import { MyAppointmentComponent } from "../../../../../features/patient/home/components/my-appointment/my-appointment.component";
import { MyMedicalHistoriesComponent } from "../../../../../features/patient/home/components/my-medical-histories/my-medical-histories.component";

interface MedicalAppointmentProps {
  nameDoctor: string;
  specialty: string;
  date: string;
  hour: string;
  status: 'Próxima' | 'Programada' | 'Cancelada';
}

interface MedicalHistoryProps {
  study: string;
  location: string;
  date: string;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
}

@Component({
  selector: 'app-home-patient',
  imports: [NavbarComponent, AvatarComponent, NgClass, StartPanelComponent, MyAppointmentComponent, MyMedicalHistoriesComponent],
  templateUrl: './home-patient.component.html',
  styleUrl: './home-patient.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePatientComponent {
  protected isInfoPanelVisible = true;
  protected isNextAppointment = true;
  protected isMedications = true;
  protected isViewAppointments = false;
  protected isViewMedicalHistories = false;
  protected appointments: MedicalAppointmentProps[] = [
    {
      nameDoctor: 'Dr. Juan Perez',
      specialty: 'Cardiologia',
      date: '10 de Marzo, 2025',
      hour: '08:00',
      status: 'Próxima',
    },
    {
      nameDoctor: 'Dr. Maria Rodriguez',
      specialty: 'Dermatologia',
      date: '20 de Marzo, 2025',
      hour: '14:00',
      status: 'Programada',
    },
  ];

  protected medicalHistories: MedicalHistoryProps[] = [
    {
      study: 'Electrocardiograma',
      location: 'Hospital General',
      date: '10 de Marzo, 2025',
      status: 'Completado',
    },
    {
      study: 'Biopsia de piel',
      location: 'Hospital Regional',
      date: '20 de Marzo, 2025',
      status: 'Pendiente',
    },
  ];

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    this.isViewAppointments = false;
    this.isViewMedicalHistories = false;
  }

  getDateNow(): string {
    const date = new Date();
    return format(date, { date: 'full' });
  }

  getMyappointment(): void {
    this.isViewAppointments = !this.isViewAppointments;
  }

  closeMyAppointment(): void {
    this.isViewAppointments = false;
  }

  getMedicalHistories(): void {
    this.isViewMedicalHistories = !this.isViewMedicalHistories;
  }

  closeMedicalHistories(): void {
    this.isViewMedicalHistories = false;
  }
}
