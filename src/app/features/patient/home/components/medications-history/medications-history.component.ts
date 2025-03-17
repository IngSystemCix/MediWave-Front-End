import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DataTableComponent } from "../../../../../shared/components/data-table/data-table.component";

interface MedicationsHistoryProps {
  medication: string;
  startDate: string;
  endDate: string;
  status: string;
  medical: string;
  [key: string]: unknown;
}

interface ColumnsTableProps {
  field: string;
  header: string;
}

interface IconsCellProps {
  icon: string;
  position: number;
  bgColor: string;
  fgColor: string;
}

@Component({
  selector: 'app-medications-history',
  imports: [DataTableComponent],
  templateUrl: './medications-history.component.html',
  styleUrl: './medications-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationsHistoryComponent {
  @Input() isViewMedicationsHistory!: boolean;
  @Output() close = new EventEmitter<void>();
  protected medicationsHistories: MedicationsHistoryProps[] = [
    {
      medication: 'Aspirin',
      startDate: '01/01/2021',
      endDate: '01/01/2022',
      status: 'Active',
      medical: 'Dr. John Doe',
    },
    {
      medication: 'Ibuprofen',
      startDate: '02/01/2021',
      endDate: '02/01/2022',
      status: 'Completed',
      medical: 'Dr. Jane Smith',
    },
    {
      medication: 'Metformin',
      startDate: '03/01/2021',
      endDate: '03/01/2022',
      status: 'Active',
      medical: 'Dr. Emily Johnson',
    },
    {
      medication: 'Lisinopril',
      startDate: '04/01/2021',
      endDate: '04/01/2022',
      status: 'Discontinued',
      medical: 'Dr. Michael Brown',
    },
    {
      medication: 'Atorvastatin',
      startDate: '05/01/2021',
      endDate: '05/01/2022',
      status: 'Active',
      medical: 'Dr. William Davis',
    },
  ];

  protected columns: ColumnsTableProps[] = [
    { field: 'medication', header: 'Medicamento' },
    { field: 'startDate', header: 'Fecha de inicio' },
    { field: 'endDate', header: 'Fecha de fin' },
    { field: 'status', header: 'Estado' },
    { field: 'medical', header: 'Médico' },
  ];

  protected iconsCell: IconsCellProps[] = [
    {
      icon: 'bi bi-capsule',
      position: 0,
      bgColor: 'bg-cyan-50',
      fgColor: 'text-cyan-500',
    },
  ];

  goBack() {
    this.close.emit();
  }
}
