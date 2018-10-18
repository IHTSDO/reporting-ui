import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    open: boolean;

    constructor() {
    }

    toggleModal(): void {
        this.open = !this.open;
    }
}
