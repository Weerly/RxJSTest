import { Injectable } from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {Helper} from '../helper';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordRxService {

    passwordTap = {
        next: val => {
            const input = Helper.getElement('password');
            Helper.removeErrorText(input);
            return of(val);
        },
        error: error => {
            const input = Helper.getElement('password');
            Helper.addErrorText(input, error.message);
            return of(error);
        }
    };

    constructor() {}

    validation(actions$): Observable<{}> {
        const password = Helper.getElement('password');
        const passwordObs = fromEvent(password, 'focusout')
            .pipe(
                map(evt => this.validater(actions$, evt)),
                tap(this.passwordTap)
            );
        return passwordObs;
    }

    validater(actions$, event, element?) {
        const elem = event.target || element;
        const value = elem.value;
        if (value === '') {
            actions$.next({type: 'passwordEmpty'});
            throw new Error('password can\'t be empty');
        } else if (value.length < 4) {
            actions$.next({type: 'passwordShort'});
            throw new Error('too short password');
        } else {
            actions$.next({type: 'passwordValid'});
            return event || true;
        }
    }

    _subscribe(passwordObs: Observable<{}>, callback?) {
        passwordObs.subscribe(value => {
            if (!!callback) { callback(); }
        }, error => {
            if (!!callback) { callback(); }
            this._subscribe(passwordObs);
        });
    }
}
