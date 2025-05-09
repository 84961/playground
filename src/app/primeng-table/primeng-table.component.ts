import { Component, OnInit, NgZone, DestroyRef, inject, DoCheck, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListboxModule } from 'primeng/listbox';
import { CompanyAuditService } from './services/company-audit.service';
import { CompanyAudit } from './models/company-audit.model';
import { FormsModule } from '@angular/forms';
import { SuppressCdDirective } from './common/suppress-cd.directive';
import { ListboxCDDirective } from './common/list-box-cd.directive';

@Component({
  selector: 'app-primeng-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    ToolbarModule,
    CardModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    ListboxModule,
    SuppressCdDirective
  ],
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.scss'],
  providers: [CompanyAuditService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //hostDirectives: [ListboxCDDirective]
})
export class PrimengTableComponent implements OnInit, OnDestroy,DoCheck {
  private destroyRef = inject(DestroyRef);
  private changeDetectionCount = 0;
  audits: CompanyAudit[] = [];
  loading: boolean = true;
  selectedAudits: CompanyAudit[] = [];
  // New properties for the Listbox
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Los Angeles', code: 'LA' },
    { name: 'Chicago', code: 'CH' },
    { name: 'Houston', code: 'HO' },
    { name: 'Phoenix', code: 'PH' },
    { name: 'Philadelphia', code: 'PA' },
    { name: 'San Antonio', code: 'SA' },
    { name: 'San Diego', code: 'SD' },
    { name: 'Dallas', code: 'DA' },
    { name: 'San Jose', code: 'SJ' },
    { name: 'Austin', code: 'AU' },
    { name: 'Jacksonville', code: 'JA' },
    { name: 'Fort Worth', code: 'FW' },
    { name: 'Columbus', code: 'CO' },
    { name: 'Charlotte', code: 'CL' },
    { name: 'San Francisco', code: 'SF' },
    { name: 'Indianapolis', code: 'IN' },
    { name: 'Seattle', code: 'SE' },
    { name: 'Denver', code: 'DE' },
    { name: 'Washington', code: 'WA' }
  ];
  selectedCity: any = null;
  constructor(
    private auditService: CompanyAuditService,
    private ngZone: NgZone
  ) {
    // this.ngZone.onMicrotaskEmpty.pipe(
    //   takeUntilDestroyed(this.destroyRef)
    // ).subscribe(() => {
    //   this.changeDetectionCount++;
    //   console.log('Change detection cycle:', this.changeDetectionCount);
    // });
  }

  onCityChange(city: any) {
    console.log('City changed:', city);
    this.selectedCity = city; // Update the selected city manually
  }

  ngOnInit() {
    this.loadAudits();
  }

  ngAfterViewInit() {
    // Run outside Angular to avoid triggering change detection
    // this.ngZone.runOutsideAngular(() => {
    //   const listbox = document.querySelector('.p-listbox');
    //   if (listbox) {
    //     listbox.addEventListener('mouseover', () => {
    //       console.log('Hovered over listbox item');
    //     });
    //   }
    // });
  }

  ngOnDestroy() {
    // const listbox = document.querySelector('.p-listbox');
    // if (listbox) {
    //   listbox.removeEventListener('mouseover', () => {
    //     console.log('Hovered over listbox item');
    //   });
    // }
  }


  ngDoCheck() {
    console.log(`Change Detection run #${++this.changeDetectionCount}`);
  }

  loadAudits() {
    this.loading = true;
    this.auditService.getAudits()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.audits = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading audits', error);
          this.loading = false;
        }
      });
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'compliant':
        return 'success';
      case 'non-compliant':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'info';
    }
  }
  
  getCriticalitySeverity(criticality: string): string {
    switch (criticality) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'compliant':
        return 'pi pi-check-circle';
      case 'non-compliant':
        return 'pi pi-times-circle';
      case 'pending':
        return 'pi pi-clock';
      default:
        return 'pi pi-info-circle';
    }
  }
}
