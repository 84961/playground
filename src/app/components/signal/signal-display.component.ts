import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-signal-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-display.component.html',
  styleUrls: ['./signal-display.component.scss'],
})
export class SignalDisplayComponent {
  private dataService = inject(DataService);
  
  // Convert the observable to a signal
  dataSignal = toSignal(this.dataService.getData());
  errorCount = signal(0);
  
  constructor() {
    // Set up an effect to monitor errors
    // effect(() => {
    //   try {
    //     // Try to read the signal
    //     const value = this.dataSignal();
    //     console.log('Signal value read successfully:', value);
    //   } catch (error) {
    //     // Increment error count when signal throws
    //     this.errorCount.update(count => count + 1);
    //     console.error('Effect caught error from signal:', error);
    //   }
    // });
  }
}