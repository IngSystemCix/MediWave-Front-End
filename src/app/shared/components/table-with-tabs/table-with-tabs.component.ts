import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  type ElementRef,
  EventEmitter,
  Input,
  Output,
  type QueryList,
  ViewChild,
  type WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { TabComponent } from '../tab/tab.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-table-with-tabs',
  imports: [AvatarComponent, NgTemplateOutlet, NgClass],
  templateUrl: './table-with-tabs.component.html',
  styleUrl: './table-with-tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWithTabsComponent<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  @Input() data: T[] = [];
  @Input() columns: { field: keyof T; header: string }[] = [];
  @Input() placeholder!: string;
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @Input() viewExtraInfo = false; // Binding con el padre
  @Output() viewExtraInfoChange = new EventEmitter<boolean>(); // Two-way binding

  @Input() selectedMyAppointment: T | null = null;
  @Output() selectedMyAppointmentChange = new EventEmitter<T | null>();

  protected activeTabIndex: WritableSignal<number> = signal(0);
  protected searchTerm: WritableSignal<string> = signal('');

  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;

  protected showLeftArrow = signal(false);
  protected showRightArrow = signal(false);
  protected scrollOffset = signal(0);

  private observer!: MutationObserver;
  private tabWidth = 128;
  private maxScrollOffset = 0;

  // Computed para obtener los datos filtrados
  protected filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.data;

    return this.data.filter((item) =>
      this.columns.some((col) =>
        String(item[col.field]).toLowerCase().includes(term)
      )
    );
  });

  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  getDataByColumn(data: T, column: keyof T): string {
    return String(data[column]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateMaxScrollOffset();
      this.updateArrows();
    }, 300);

    this.observer = new MutationObserver(() => {
      setTimeout(() => {
        this.calculateMaxScrollOffset();
        this.updateArrows();
      }, 100);
    });
    this.observer.observe(this.tabsWrapper.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  setActiveTab(index: number) {
    this.activeTabIndex.set(index);
  }

  scrollTabs(direction: 'left' | 'right') {
    const containerWidth = this.tabsContainer.nativeElement.clientWidth;
    const wrapperWidth = this.tabsWrapper.nativeElement.scrollWidth;

    const visibleTabs = Math.floor(containerWidth / this.getTabWidth());
    const scrollAmount = visibleTabs * this.getTabWidth();

    let newOffset =
      this.scrollOffset() +
      (direction === 'left' ? scrollAmount : -scrollAmount);

    newOffset = Math.max(-this.maxScrollOffset, Math.min(0, newOffset));

    this.scrollOffset.set(newOffset);

    setTimeout(() => this.updateArrows(), 300);
  }

  private getTabWidth(): number {
    if (this.tabs.length > 0) {
      const firstTab = this.tabsWrapper.nativeElement.querySelector('button');
      return firstTab ? firstTab.clientWidth : this.tabWidth;
    }
    return this.tabWidth;
  }

  private calculateMaxScrollOffset() {
    setTimeout(() => {
      const containerWidth = this.tabsContainer.nativeElement.clientWidth;
      const wrapperWidth = this.tabsWrapper.nativeElement.scrollWidth;

      this.maxScrollOffset = Math.max(0, wrapperWidth - containerWidth);

      this.updateArrows();
    }, 50);
  }

  private updateArrows() {
    this.showLeftArrow.set(this.scrollOffset() < 0);
    this.showRightArrow.set(
      Math.abs(this.scrollOffset()) < this.maxScrollOffset
    );
  }

  toggleExtraInfo(data: T) {
    this.selectedMyAppointment = data;
    this.selectedMyAppointmentChange.emit(this.selectedMyAppointment);

    this.viewExtraInfo = true;
    this.viewExtraInfoChange.emit(this.viewExtraInfo);
  }
}
