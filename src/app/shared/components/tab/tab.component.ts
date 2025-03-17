import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <ng-template #tpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() title!: string;

  @ViewChild('tpl', { static: true }) content!: TemplateRef<unknown>;
}
