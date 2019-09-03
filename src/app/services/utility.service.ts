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

    static convertStringToConceptObject(input: string): Concept {
        input = input.trim();

        const sctId = String(input.match(/\d+/)[0]);
        let fsn: string;

        input.includes('|') ? fsn = input.slice(input.indexOf('|') + 1, input.lastIndexOf('|')) : fsn = '';

        return { sctId: sctId, fsn: fsn};
    }

    static appendStringToStringList(stringList: string, text: string): string {
        return stringList.slice(0, stringList.lastIndexOf(',')) + ', ' + text;
    }
}
