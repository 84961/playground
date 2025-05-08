import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../services/data.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-handled-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './handled-signal.component.html',
  styleUrls : ['./handled-signal.component.scss'],
})
export class HandledSignalComponent {
  private dataService = inject(DataService);
  errorState = signal<Error | null>(null);
  
  // Convert observable to signal with proper error handling
  safeDataSignal = toSignal(
    this.dataService.getData().pipe(
      catchError(error => {
        // Store the error separately
        this.errorState.set(error);
        // Return a fallback value
        return of('Error occurred - using fallback value');
      })
    )
  );
}