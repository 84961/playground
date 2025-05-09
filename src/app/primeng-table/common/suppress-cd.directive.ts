/* import { Directive, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[suppressCd]',
    standalone: true
})
export class SuppressCdDirective implements OnInit, OnDestroy {
    private eventCleanupFns: (() => void)[] = [];

    constructor(
        private elementRef: ElementRef,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const element = this.elementRef.nativeElement;
            this.addEventListeners(element);
        });
    }

    private addEventListeners(element: HTMLElement) {
        const events = ['mouseover', 'mouseenter', 'mouseleave', 'mousemove'];
        
        events.forEach(eventName => {
            const handler = (e: Event) => {
                const target = e.target as HTMLElement;
                // Only stop events for p-listbox elements
                if (target.closest('.p-listbox')) {
                    e.stopPropagation();
                }
            };

            element.addEventListener(eventName, handler, true);
            this.eventCleanupFns.push(() => 
                element.removeEventListener(eventName, handler, true)
            );
        });
    }

    ngOnDestroy() {
        this.eventCleanupFns.forEach(cleanup => cleanup());
        this.eventCleanupFns = [];
    }
} */

import { Directive, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[suppressCd]',
    standalone: true
})
export class SuppressCdDirective implements OnInit, OnDestroy {
    private eventCleanupFns: (() => void)[] = [];

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const listbox = this.elementRef.nativeElement;
            
            // Handle mouse events
            const events = ['mouseover', 'mouseenter', 'mouseleave', 'mousemove'];
            events.forEach(eventName => {
                const handler = (e: Event) => {
                    if (e.target === listbox || listbox.contains(e.target as Node)) {
                        // Prevent event from triggering CD but allow PrimeNG handlers
                        e.preventDefault();
                    }
                };
                
                listbox.addEventListener(eventName, handler);
                this.eventCleanupFns.push(() => 
                    listbox.removeEventListener(eventName, handler)
                );
            });

            // Handle click/selection separately
            const clickHandler = (e: Event) => {
                if (e.target === listbox || listbox.contains(e.target as Node)) {
                    console.debug('Listbox interaction handled outside Angular zone');
                }
            };
            
            listbox.addEventListener('click', clickHandler);
            this.eventCleanupFns.push(() => 
                listbox.removeEventListener('click', clickHandler)
            );
        });
    }

    ngOnDestroy() {
        this.eventCleanupFns.forEach(cleanup => cleanup());
        this.eventCleanupFns = [];
    }
}