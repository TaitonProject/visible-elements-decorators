export function setVisibleAfterApply(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        this.setVisible();
        return result;
    };
    return descriptor;
}

export function applyIfExist(propertyName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value; // save a reference to the original method
        descriptor.value = function (...args: any[]) {
            let result;
            if (this[propertyName]) {
                result = originalMethod.apply(this, args);
            }
            return result;
        };
        return descriptor;
    };
}
