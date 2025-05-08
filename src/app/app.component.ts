import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalDisplayComponent } from './components/signal/signal-display.component';
import { AsyncDisplayComponent } from './components/async/async-display.component';
import { HandledSignalComponent } from './components/handledsignal/handled-signal.component';
import { DataService } from './services/data.service';
import { SignalDisplayComponentAll } from './components/signal-display-all.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SignalDisplayComponent,
    AsyncDisplayComponent,
    HandledSignalComponent,
    SignalDisplayComponentAll
  ],
  templateUrl: './app.component.html',
  styles: [`
    
  `]
})
export class AppComponent {
  // private dataService = inject(DataService);
  
  // triggerError() {
  //   this.dataService.triggerError();
  // }
}
