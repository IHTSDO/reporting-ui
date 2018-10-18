import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    open: boolean;

    constructor(private http: HttpService) {
    }

    toggleModal(): void {
        this.open = !this.open;
    }

    postReport(query, inputs) {
        let parameters = {};

        if (!query.parameterNames) {
            parameters = null;
        }
        else {
            for (let i = 0; i < query.parameterNames.length; i++) {
                parameters[query.parameterNames[i]] = inputs[i];
            }
        }

        let params = {
            jobName: query.name,
            parameters: parameters
        };

        return this.http.postReport(params);
    }

    postReport_alt(query, inputs) {
        let params = {
            jobName: query.name,
            parameters: {}
        };

        if(!query.parameterNames) {
            params.parameters = null
        }
        else {
            for (let i = 0; i < query.parameterNames.length; i++) {
                params.parameters[query.parameterNames[i]] = inputs[i];
            }
        }

        return this.http.postReport(params);
    }
}
