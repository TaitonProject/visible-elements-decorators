import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { setVisibleAfterCall, executeIfExist } from './utils/decorators/tooltip.decorator';
import { HTMLDivElementPerfomance } from './core/html-div-element-perfomance.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    @ViewChild('gridElement') gridElement: ElementRef<HTMLDivElementPerfomance>;

    rows: Array<string> = new Array<string>();
    tooltipElement: HTMLDivElementPerfomance;
    activeRowElement: HTMLDivElementPerfomance;
    paddingOfTooltip = -20;
    elemsWithBoundingRects = [];

    constructor(private renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.initRows();
    }

    initRows() {
        for (let i = 0; i < 200; i++) {
            this.rows.push('my new rows' + i);
        }
    }

    gridScroll() {
        console.log('grdi scroll');
        this.redrawTooltip();
    }

    onResize() {
        console.log('on resize');
        this.redrawTooltip();
    }

    @setVisibleAfterCall
    createTooltip(index: number, rowElement: HTMLDivElement) {
        console.log('create');
        this.removeTooltip();
        const rowElementPerfomance: HTMLDivElementPerfomance = new HTMLDivElementPerfomance(rowElement);
        const rowElementRect: ClientRect = rowElementPerfomance.getBoundingClientRect();
        const divElement = this.renderer.createElement('div');
        divElement.style.width = '50px';
        divElement.style.height = '20px';
        divElement.style.backgroundColor = 'green';
        divElement.style.position = 'fixed';
        divElement.innerHTML = index.toString();
        divElement.style.top = rowElementRect.top + this.paddingOfTooltip + 'px';
        divElement.style.left = rowElementRect.left + 'px';
        const divElementPerfomance: HTMLDivElementPerfomance = new HTMLDivElementPerfomance(divElement);
        document.body.appendChild(divElementPerfomance.element);
        this.tooltipElement = divElementPerfomance;
        this.activeRowElement = rowElementPerfomance;
    }

    setVisible() {
        const tooltipRect: ClientRect = this.tooltipElement.getBoundingClientRect();
        const gridRect: ClientRect = this.gridElement.nativeElement.getBoundingClientRect();
        if (tooltipRect.top < gridRect.top || tooltipRect.bottom > gridRect.bottom) {
            this.tooltipElement.element.style.visibility = 'hidden';
        } else {
            this.tooltipElement.element.style.visibility = 'visible';
        }
    }

    @executeIfExist('tooltipElement')
    @setVisibleAfterCall
    redrawTooltip() {
        console.log('redraw');
        this.tooltipElement.element.style.top = (this.activeRowElement.getBoundingClientRect().top) + this.paddingOfTooltip + 'px';
    }

    @executeIfExist('tooltipElement')
    removeTooltip() {
        this.tooltipElement.remove();
    }

}
