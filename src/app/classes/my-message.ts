export abstract class MyMessage {

    message = false;
    errorMessage = '';
    message_type = 'alert-danger';

    showMessage(type: string, message: string, time: number) {
        this.errorMessage = message;
        this.message_type = 'alert-' + type;
        this.message = true;
        setTimeout(() => {
            this.message = false;
        }, time);
    }
}