import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-combobox',
  imports: [],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxComponent {
  @Input() width!: string;
  @Input() type!: 'hour' | 'text';
  @Input() startHour!: string;
  @Input() endHour!: string;
  @Input() stepMinute!: number;
  @Input() formatHour!: '12' | '24';
  @Input() data!: string[]; // this is for the text type
  @Input() placeholder!: string;
  // two-way binding
  @Input() selected: { name: string } | null = null; // Se define correctamente como un Input
  @Output() selectedChange = new EventEmitter<{ name: string }>(); // Se define correctamente como un Output

  @Input() disabled!: boolean;
  @Output() disabledChange = new EventEmitter<boolean>();

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {}

  protected currentPeriod!: string;
  protected visiblePanel = false;

  @HostListener('document:click', ['$event'])
  protected closePanel(event: MouseEvent): void {
    if (
      this.visiblePanel &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.visiblePanel = false;
    }
  }

  protected getGroupedHours(): { period: string; hours: string[] }[] {
    const start = this.startHour.split(':');
    const end = this.endHour.split(':');
    const step = this.stepMinute || 60;
    const groupedHours: { [key: string]: string[] } = {
      Mañana: [],
      Tarde: [],
      Noche: [],
    };

    let currentHour = Number.parseInt(start[0]);
    let currentMinute = Number.parseInt(start[1]);

    while (
      currentHour < Number.parseInt(end[0]) ||
      (currentHour === Number.parseInt(end[0]) &&
        currentMinute <= Number.parseInt(end[1]))
    ) {
      let hour = currentHour;
      let period = '';

      if (this.formatHour === '12') {
        period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
      }

      const time = `${hour.toString().padStart(2, '0')}:${currentMinute
        .toString()
        .padStart(2, '0')}`;

      if (this.formatHour === '24') {
        if (currentHour >= 6 && currentHour < 12) {
          period = 'Mañana';
        } else if (currentHour >= 12 && currentHour < 18) {
          period = 'Tarde';
        } else {
          period = 'Noche';
        }
      }

      groupedHours[period].push(time);

      currentMinute += step;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    // Convertir el objeto en un array de objetos
    return Object.entries(groupedHours)
      .filter(([_, hours]) => hours.length > 0)
      .map(([period, hours]) => ({ period, hours }));
  }

  protected openPanel(): void {
    if(this.disabled) return;
    this.visiblePanel = !this.visiblePanel;
  }

  protected selectHour(hour: string): void {
    this.selected = { name: hour }; // Se actualiza el valor seleccionado
    this.selectedChange.emit(this.selected); // Emitimos el cambio
  }

  protected selectText(text: string): void {
    this.selected = { name: text }; // Se actualiza el valor seleccionado
    this.selectedChange.emit(this.selected); // Emitimos el cambio
  }
}
