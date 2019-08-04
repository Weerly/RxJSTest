import { Injectable } from '@angular/core';
import {Helper} from '../helper';
import {fromEvent, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailRxService {

    emailTap = {
        next: val => {
            const input = Helper.getElement('email');
            Helper.removeErrorText(input);
            return of(val);
        },
        error: error => {
            const input = Helper.getElement('email');
            Helper.addErrorText(input, error.message);
            return of(error);
        }
    };

    constructor() { }

    validater(actions$, event, element?) {
        const elem = event.target || element;
        const value = elem.value;
        if (value === '') {
            actions$.next({type: 'emailEmpty'});
            throw new Error('email can\'t be empty');
        } else if (value.match(/^\w+@[a-zA-Z]+.[a-zA-Z]+(.?)[a-zA-Z]+$/g) == null) {
            actions$.next({type: 'emailWrong'});
            throw new Error('wrong mail format');
        } else {
            actions$.next({type: 'emailValid'});
            return event || true;
        }
    }

    validation(actions$): Observable<{}> {
        return fromEvent(Helper.getElement('email'), 'focusout')
            .pipe(
                map(evt => this.validater(actions$, evt)),
                tap(this.emailTap)
            );
    }

    _subscribe(emailObs: Observable<{}>) {
        emailObs.subscribe(value => {
        }, error => this._subscribe(emailObs));
    }
}
