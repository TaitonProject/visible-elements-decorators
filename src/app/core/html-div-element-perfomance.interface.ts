export class HTMLDivElementPerfomance {

    elemsWithBoundingRects: Array<any> = new Array();
    private _boundingClientRect: ClientRect;

    constructor(public element: HTMLDivElement) {

    }

    getBoundingClientRect(): ClientRect {
        // Check if we already got the client rect before.
        // if (!this._boundingClientRect) {
        // If not, get it then store it for future use.
        this._boundingClientRect = this.element.getBoundingClientRect();
        this.elemsWithBoundingRects.push(this);
        // }
        return this._boundingClientRect;
    }

    clearClientRects() {
        let i;
        for (i = 0; i < this.elemsWithBoundingRects.length; i++) {
            if (this.elemsWithBoundingRects[i]) {
                this.elemsWithBoundingRects[i]._boundingClientRect = null;
            }
        }
        this.elemsWithBoundingRects = [];
    }

    remove() {
        this.clearClientRects();
        this.element.remove();
    }
}
