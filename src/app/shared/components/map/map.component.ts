import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  protected center!: google.maps.LatLngLiteral;

  @Input()
  set position(position: google.maps.LatLngLiteral) {
    if (position) {
      this.center = { ...position }; // Actualizamos el centro
    }
  }

  @Input() location!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() zoom!: number;

  @Input() optionsMap!: google.maps.MapOptions;
}
