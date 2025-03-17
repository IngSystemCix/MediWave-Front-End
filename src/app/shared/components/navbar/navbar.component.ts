import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { ModalScheduleNewAppointmentComponent } from "../../../features/patient/home/components/modal-schedule-new-appointment/modal-schedule-new-appointment.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarComponent, ModalScheduleNewAppointmentComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() username!: string;
  isSidebarOpen = false;
  currentStep = 1;
  isModalOpen = false;

  protected specialists: string[] = [
    'Dra. Ana María - Cardiología',
    'Dr. Juan Pérez - Traumatología',
    'Dra. María José - Dermatología',
    'Dr. Carlos - Pediatría',
    'Dra. Laura - Ginecología',
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModalNewAppointment(): void {
    this.isModalOpen = true;
    this.currentStep = 1; // Reiniciar al primer paso
  }

  closeModalNewAppointment(): void {
    this.isModalOpen = false;
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.closeModalNewAppointment();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  @HostListener('document:click', ['$event'])
  closeSidebarOnClickOutside(event: Event): void {
    const sidebarElement = document.querySelector('.sidebar');
    const buttonElement = document.querySelector('.toggle-button');

    if (
      this.isSidebarOpen &&
      sidebarElement &&
      !sidebarElement.contains(event.target as Node) &&
      buttonElement &&
      !buttonElement.contains(event.target as Node)
    ) {
      this.isSidebarOpen = false;
    }
  }
}
