import { Directive, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[p-listbox]',
    standalone: true
})
export class ListboxCDDirective implements OnInit, OnDestroy {
    private cleanup: (() => void)[] = [];

    constructor(
        private el: ElementRef,
        private zone: NgZone
    ) {}

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            const listItems = this.el.nativeElement.querySelector('.p-listbox-list');
            if (!listItems) return;

            const handleMouseEvents = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.p-listbox-item')) return;
                
                // Allow these events to propagate
                if (e.type === 'click' || 
                    e.type === 'mousedown' || 
                    e.type.includes('drag')) return;

                e.stopPropagation();
            };

            ['mouseover', 'mouseenter', 'mousemove'].forEach(event => {
                listItems.addEventListener(event, handleMouseEvents, true);
                this.cleanup.push(() => 
                    listItems.removeEventListener(event, handleMouseEvents, true)
                );
            });
        });
    }

    ngOnDestroy() {
        this.cleanup.forEach(fn => fn());
    }
}