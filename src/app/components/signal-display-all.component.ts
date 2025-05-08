import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';

// @Component({
//   selector: 'app-signal-display-all',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//   <div>
//       <h3>Error Behavior Test (Read #{{readCount()}})</h3>
      
//       <div>
//         <h4>toSignal</h4>
//         <p>Value: {{ basicSignal() ?? 'null' }}</p>
//         <p>Last successful: {{ signalValue() }}</p>
//       </div>

//       <div>
//         <h4>Observable/Async</h4>
//         <p>Pipe: {{ data$ | async }}</p>
//         <p>Last successful: {{ asyncValue() }}</p>
//       </div>

//       <button (click)="triggerError()">Trigger Error</button>
//       <button (click)="readBoth()">Read Both</button>
//     </div>
//   `,
//   styles: [`
//     .signal-group { 
//       margin: 1rem 0; 
//       padding: 1rem; 
//       border: 1px solid #ccc; 
//     }
//   `]
// })
// export class SignalDisplayComponentAll {
//   private dataService = inject(DataService);
  
//   // Create fresh subscriptions for each test
//   data$ = this.dataService.getData();
//   basicSignal = toSignal(this.dataService.getData());
  
//   // Track values and errors
//   signalValue = signal<string | null | undefined>(null);
//   asyncValue = signal<string | null>(null);
//   readCount = signal(0);

//   readBoth() {
//     this.readCount.update(c => c + 1);
//     console.log(`\n=== Read Attempt ${this.readCount()} ===`);

//     // Test signal
//     try {
//       const value = this.basicSignal();
//       this.signalValue.set(value);
//       console.log('Signal read:', value);
//     } catch (error) {
//       console.log('Signal threw:', error);
//     }

//     // Create new subscription for each read
//     this.dataService.getData().pipe(take(1)).subscribe({
//       next: (value) => {
//         this.asyncValue.set(value);
//         console.log('Direct observable read:', value);
//       },
//       error: (err) => console.log('Observable error:', err)
//     });
//   }

//   triggerError() {
//     console.log('Triggering error...');
//     this.dataService.triggerError();
//   }

// }

@Component({
  selector: 'app-signal-display-all',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
      <h3>Error Behavior Test (Read #{{readCount()}})</h3>
      
      <div>
        <h4>toSignal</h4>
        <p>Value: {{ getBasicSignalValue() }}</p>
      </div>

      <div>
        <h4>Observable with Async Pipe</h4>
        <p>Same instance: {{ sameObservable$ | async }}</p>
      </div>

      <div>
        <h4>Fresh Observable</h4>
        <p>New subscription: {{ asyncValue() }}</p>
      </div>

      <button (click)="triggerError()">Trigger Error</button>
      <button (click)="readBoth()">Read Both</button>
    </div>
  `
})
export class SignalDisplayComponentAll {
  private dataService = inject(DataService);
  
  // Same instance used for async pipe
  sameObservable$ = this.dataService.getData();
  
  // Signal from same observable
  basicSignal = toSignal(this.dataService.getData());
  
  // For fresh subscription results
  asyncValue = signal<string | null>(null);
  readCount = signal(0);

  getBasicSignalValue(): string | null | undefined {
    try {
      console.log('Reading basic signal...');
      return this.basicSignal();
    } catch (e) {
      return 'Error state';
    }
  }

  readBoth() {
    this.readCount.update(c => c + 1);
    
    // Create new subscription for each read
    this.dataService.getData().pipe(take(1)).subscribe({
      next: (value) => {
        this.asyncValue.set(value);
      },
      error: (err) => console.log('New subscription error:', err)
    });
  }

  triggerError() {
    this.dataService.triggerError();
  }
}