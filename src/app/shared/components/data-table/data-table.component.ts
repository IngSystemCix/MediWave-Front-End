import { ExportService } from '@/core/services/export.service';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-data-table',
  imports: [FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  @Input() data: T[] = [];
  @Input() columns: { field: string; header: string }[] = [];
  @Input() iconsCell: {
    icon: string;
    position: number;
    bgColor: string;
    fgColor: string;
  }[] = [];
  @Input() rows!: number;
  @Input() placeholder!: string;

  protected filterText = '';
  protected isDropdownOpen = false;
  protected currentPage = 1;

  protected sortedColumn: string | null = null;
  protected sortDirection: 'asc' | 'desc' = 'asc';

  constructor(@Inject(ExportService) private exportService: ExportService) {}

  get filterData() {
    return this.data.filter((item) => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(this.filterText.toLowerCase());
    });
  }

  exportTable(format: string) {
    this.exportService.exportData(this.filterData, this.columns, format);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;

    // Verifica si el clic fue fuera del menú desplegable
    if (!target.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  getIconForColumn(index: number): string | null {
    const iconEntry = this.iconsCell.find((icon) => icon.position === index);
    return iconEntry ? iconEntry.icon : null;
  }

  getIconBgColorAndFgColor(index: number): {
    bgColor: string;
    fgColor: string;
  } {
    const iconEntry = this.iconsCell.find((icon) => icon.position === index);
    return iconEntry
      ? { bgColor: iconEntry.bgColor, fgColor: iconEntry.fgColor }
      : { bgColor: '', fgColor: '' };
  }

  get totalPages(): number {
    return Math.ceil(this.filterData.length / this.rows);
  }

  get paginatedData(): T[] {
    const filtered = this.sortedData();
    const startIndex = (this.currentPage - 1) * this.rows;
    return filtered.slice(startIndex, startIndex + this.rows);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get visiblePages(): number[] {
    let pages: number[] = [];
    const totalPages = this.totalPages; // Total de páginas
    const currentPage = this.currentPage; // Página actual

    if (totalPages <= 5) {
      // Si hay 5 o menos páginas, mostrar todas
      pages = Array.from({ length: totalPages - 2 }, (_, i) => i + 2);
    } else {
      // Mostrar páginas cercanas a la actual
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return pages;
  }

  sortedData(): T[] {
    const filtered = this.filterData; // Filtra los datos primero

    if (!this.sortedColumn) return filtered;

    return [...filtered].sort((a, b) => {
      const valueA = a[this.sortedColumn as keyof T];
      const valueB = b[this.sortedColumn as keyof T];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (this.isDate(valueA) && this.isDate(valueB)) {
        return this.sortDirection === 'asc'
          ? new Date(valueA as string | number).getTime() -
              new Date(valueB as string | number).getTime()
          : new Date(valueB as string | number).getTime() -
              new Date(valueA as string | number).getTime();
      }

      return this.sortDirection === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }

  isDate(value: unknown): boolean {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value));
  }

  toggleSort(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
