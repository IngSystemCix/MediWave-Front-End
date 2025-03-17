import { Component, type OnInit, type OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading = true;

  ngOnInit() {
    // Bloquear el scroll mientras carga
    document.body.classList.add('overflow-hidden');

    // Simular carga y ocultar con retraso
    setTimeout(() => {
      this.loading = false;
      document.body.classList.remove('overflow-hidden');
    }, 2500);
  }

  ngOnDestroy() {
    // Asegurar que el scroll se restablezca al desmontar
    document.body.classList.remove('overflow-hidden');
  }
}
