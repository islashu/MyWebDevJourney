export class StringValidatorBuilder {
    private messages: Array<string> = [];
    constructor(private value: string) {}

    isEmpty(message: string) {
        if (this.value.trim().length === 0) {
            this.messages.push(message);
        }
        return this;
    }

    maxLength(max: number, message: string) {
        if (this.value.length > max) {
            this.messages.push(message);
        }
        return this;
    }

    minLength(min: number, message: string) {
        if (this.value.length < min) {
            this.messages.push(message);
        }
        return this;
    }

    is(pattern: RegExp, message: string) {
        if (!pattern.test(this.value)) {
            this.messages.push(message);
        }
        return this;
    }

    build(): Array<string> {
        return this.messages;
    }
}
