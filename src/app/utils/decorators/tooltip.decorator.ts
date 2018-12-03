
export function setVisibleAfterCall(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log('setVisibleAfterCall');
    const originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function (...args: any[]) {
        console.log('call set visible from setVisibleAfterCall');
        const result = originalMethod.apply(this, args);
        this.setVisible();

        return result;
    };
    return descriptor;
}

export function executeIfExist(propertyName: string) {
    console.log('applyIfExist');
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value; // save a reference to the original method
        descriptor.value = function (...args: any[]) {
            let result;
            if (this[propertyName]) {
                console.log('call method from applyIfExist');
                result = originalMethod.apply(this, args);
            }
            return result;
        };
        return descriptor;
    };
}

export function Unsubscribe() {
    return function (target: any) {
        console.log('target', target);
        target.prototype.ngOnDestroy = function () {
            const self = this;
            if (!self.subscriptions || !self._subscriptions) {
                throw new Error('in class ' + target.prototype.constructor.name +
                    ' does not exist property `subscriptions` or `_subscriptions`');
            } else {
                this.subscriptions.forEach(_ => _.unsubscribe());
            }
        };
    };
}

export function AutoUnsubscribe() {
    return function (target: any) {

        target.prototype.ngOnDestroy = function () {
            const self = this;
            console.log('target', target);
            console.log('self', this.gg.observers.forEach(_ => _._subscriptions.forEach(item => item.unsubscribe())));
            // for (let prop in self) {
            //     const property = this[prop];
            //     if (property && (typeof property.unsubscribe === 'function') {
            //         property.unsubscribe();
            //     }
            // }

            for (const prop in self) {
                if (this.hasOwnProperty(prop)) {
                    if (self[prop] && (typeof self[prop].subscribe === 'function')) {
                        console.log('need unsub', self[prop]['_subscribe'].prototype);
                    }
                }
            }
            // if (!self.subscriptions || !self._subscriptions) {
            //     throw new Error('in class ' + target.prototype.constructor.name +
            //         ' does not exist property `subscriptions` or `_subscriptions`');
            // } else {
            //     this.subscriptions.forEach(_ => _.unsubscribe());
            // }
        };
    };
}
