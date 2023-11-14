export class StringSplicerBuilder {
    private messages = '';
    removeTime(message: string) {
        let endIndex = 0;

        this.messages = message.split('T')[0];

        return this;
    }

    build(): string {
        return this.messages;
    }
}
