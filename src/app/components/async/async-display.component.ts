import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-async-display',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './async-display.component.html',
  styleUrls: ['./async-display.component.scss'],
})
export class AsyncDisplayComponent {
  private dataService = inject(DataService);
  
  // Direct observable for async pipe
  data$ = this.dataService.getData();
}