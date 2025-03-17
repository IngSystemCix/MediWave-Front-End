import { NgTemplateOutlet } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  type ElementRef,
  type QueryList,
  ViewChild,
  type WritableSignal,
  signal,
  type OnDestroy,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  protected activeTabIndex: WritableSignal<number> = signal(0);
  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabsWrapper') tabsWrapper!: ElementRef<HTMLDivElement>;

  protected showLeftArrow = signal(false);
  protected showRightArrow = signal(false);
  protected scrollOffset = signal(0);

  private observer!: MutationObserver;
  private tabWidth = 128; // Ancho estimado de cada tab (ajústalo si es necesario)
  private maxScrollOffset = 0; // Para evitar que el scroll se detenga antes de tiempo

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateMaxScrollOffset();
      this.updateArrows();
    }, 300);

    // Observar cambios en el DOM
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

    // Determinar cuánto desplazarse basado en el ancho real de las tabs
    const visibleTabs = Math.floor(containerWidth / this.getTabWidth());
    const scrollAmount = visibleTabs * this.getTabWidth();

    let newOffset =
      this.scrollOffset() +
      (direction === 'left' ? scrollAmount : -scrollAmount);

    // Limitar el desplazamiento
    newOffset = Math.max(-this.maxScrollOffset, Math.min(0, newOffset));

    this.scrollOffset.set(newOffset);

    setTimeout(() => this.updateArrows(), 300);
  }

  private getTabWidth(): number {
    if (this.tabs.length > 0) {
      const firstTab = this.tabsWrapper.nativeElement.querySelector('button');
      return firstTab ? firstTab.clientWidth : this.tabWidth; // Si no encuentra el botón, usa el valor por defecto
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
}
