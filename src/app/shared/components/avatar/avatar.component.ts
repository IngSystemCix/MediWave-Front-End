import { generatorColorHSLA } from '@/utils';
import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [NgStyle, NgClass],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() username!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() fontSize!: string;

  getColor(name: string): string {
    return generatorColorHSLA(name);
  }

  getInitials(): string {
    return this.username.split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}
