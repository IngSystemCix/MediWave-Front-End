import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format } from '@formkit/tempo';

interface RequestMedicationProps {
  isChecked: boolean;
  name: string;
  amount: string;
  amountAvailable: number;
  reaminingTime: number;
}

interface PharmacyProps {
  name: string;
  address: string;
  openingHours: string;
  daysToPickUp: number;
}

interface HomeDeliveryProps {
  address: string;
  city: string;
  daysToPickUp: number;
  deliveryTime: string;
  additionalCost: number;
}

@Component({
  selector: 'app-request-medication',
  imports: [FormsModule],
  templateUrl: './request-medication.component.html',
  styleUrl: './request-medication.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestMedicationComponent {
  @Input() isRequestMedication!: boolean;
  @Output() close = new EventEmitter<void>();

  protected positionStep = 1;
  protected selectedMethod = 'pharmacy';
  protected selectedPharmacy: PharmacyProps | null = null;
  protected additionalNotes = '';
  protected acceptTerms!: boolean;
  protected pharmacies: PharmacyProps[] = [
    {
      name: 'Farmacia Central MediWave',
      address: 'Av. Principal 123, Madrid',
      openingHours: 'Lun-Vie: 8:00-20:00, Sáb: 9:00-14:00',
      daysToPickUp: 3,
    },
    {
      name: 'Farmacia SaludPlus',
      address: 'Calle Mayor 45, Barcelona',
      openingHours: 'Lun-Sáb: 9:00-21:00, Dom: 10:00-14:00',
      daysToPickUp: 2,
    },
    {
      name: 'Farmacia San José',
      address: 'Plaza del Sol 7, Sevilla',
      openingHours: 'Lun-Vie: 7:30-22:00, Sáb-Dom: 9:00-18:00',
      daysToPickUp: 1,
    },
    {
      name: 'Botica VitalCare',
      address: 'Av. Libertad 202, Valencia',
      openingHours: 'Lun-Vie: 8:00-19:00, Sáb: 9:00-13:00',
      daysToPickUp: 4,
    },
  ];
  protected requestMedications: RequestMedicationProps[] = [
    {
      isChecked: false,
      name: 'Ibuflam',
      amount: '200mg',
      amountAvailable: 10,
      reaminingTime: 5,
    },
    {
      isChecked: false,
      name: 'Paracetamol',
      amount: '500mg',
      amountAvailable: 5,
      reaminingTime: 2,
    },
    {
      isChecked: false,
      name: 'Aspirin',
      amount: '100mg',
      amountAvailable: 15,
      reaminingTime: 10,
    },
    {
      isChecked: false,
      name: 'Vitamin C',
      amount: '100mg',
      amountAvailable: 20,
      reaminingTime: 15,
    },
  ];

  protected homeDelivery: HomeDeliveryProps = {
    address: 'Calle Principal 123',
    city: 'Madrid',
    daysToPickUp: 2,
    deliveryTime: '9:00-13:00',
    additionalCost: 5,
  };

  goBack() {
    this.close.emit();
  }

  toggleRequestMedication(check: RequestMedicationProps) {
    check.isChecked = !check.isChecked;
  }

  nextStep() {
    this.positionStep++;
  }

  previousStep() {
    this.positionStep--;
  }

  requestMedicationsAction() {
    this.close.emit();
  }

  isRequestMedicationsEmpty() {
    return (
      this.requestMedications.filter((item) => item.isChecked).length === 0
    );
  }

  getDataPharmacy() {
    return this.selectedPharmacy;
  }

  getDayToPickUp(): string {
    const date = new Date();
    const days = this.selectedPharmacy?.daysToPickUp || 0;
    date.setDate(date.getDate() + days);
    return format(date, 'full', 'es');
  }

  getDayToPickUpHome(): string {
    const date = new Date();
    const days = this.homeDelivery.daysToPickUp;
    date.setDate(date.getDate() + days);
    return format(date, 'full', 'es');
  }

  getDeliveryCostMoney(): string {
    return 'S/'.concat(this.homeDelivery.additionalCost.toFixed(2));
  }

  isSelectedPharmacyOrHomeDelivery(): boolean {
    if (this.selectedMethod === 'pharmacy') {
      return this.selectedPharmacy === null; // Si no hay farmacia seleccionada, deshabilita el botón
    }
    if (this.selectedMethod === 'home') {
      return false; // Si se seleccionó entrega a domicilio, habilita el botón
    }
    return true; // Si no se ha seleccionado ningún método, deshabilita el botón
  }
}
