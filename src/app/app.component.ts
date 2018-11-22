import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { setVisibleAfterApply, applyIfExist } from './utils/decorators/tooltip.decorator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    @ViewChild('gridElement') gridElement: ElementRef<HTMLDivElement>;
    @ViewChild('resizeElement') resizeElement: ElementRef<HTMLDivElement>;

    rows: Array<string> = new Array<string>();
    tooltipElement: HTMLDivElement;
    activeRowElement: HTMLDivElement;
    paddingOfTooltip = -20;

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
        this.redrawTooltip();
    }

    onResize() {
        this.redrawTooltip();
    }

    @setVisibleAfterApply
    createTooltip(index: number, rowElement: HTMLDivElement) {
        this.removeTooltip();
        const rowElementRect: ClientRect = rowElement.getBoundingClientRect();
        const divElement: HTMLDivElement = this.renderer.createElement('div');
        divElement.style.width = '50px';
        divElement.style.height = '20px';
        divElement.style.backgroundColor = 'green';
        divElement.style.position = 'fixed';
        divElement.innerHTML = index.toString();
        divElement.style.top = rowElementRect.top + this.paddingOfTooltip + 'px';
        divElement.style.left = rowElementRect.left + 'px';
        document.body.appendChild(divElement);
        this.tooltipElement = divElement;
        this.activeRowElement = rowElement;
    }

    setVisible() {
        const tooltipRect: ClientRect = this.tooltipElement.getBoundingClientRect();
        const gridRect: ClientRect = this.gridElement.nativeElement.getBoundingClientRect();
        if (tooltipRect.top < gridRect.top || tooltipRect.bottom > gridRect.bottom) {
            this.tooltipElement.style.visibility = 'hidden';
        } else {
            this.tooltipElement.style.visibility = 'visible';
        }
    }

    @applyIfExist('tooltipElement')
    @setVisibleAfterApply
    redrawTooltip() {
        this.tooltipElement.style.top = (this.activeRowElement.getBoundingClientRect().top) + this.paddingOfTooltip + 'px';
    }

    @applyIfExist('tooltipElement')
    removeTooltip() {
        this.tooltipElement.remove();
    }

}
