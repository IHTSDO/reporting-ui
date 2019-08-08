import { Injectable } from '@angular/core';
import { Concept } from '../models/concept';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() {
    }

    static convertConceptObjectToString(input): string {
        return input.id + ' |' + input.fsn.term + '|';
    }

    static convertStringToConceptObject(input): Concept {
        input = input.trim();

        // const sctId = Number(input.match(/\d+/)[0]);
        const sctId = String(input.match(/\d+/)[0]);
        const fsn = input.slice(input.indexOf('|') + 1, input.lastIndexOf('|'));

        return { sctId: sctId, fsn: fsn};
    }

    static appendStringToStringList(stringList, string): string {
        return stringList.slice(0, stringList.lastIndexOf(',')) + ', ' + string;
    }
}
