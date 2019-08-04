import {Injectable} from '@angular/core';
import {Helper} from '../helper';
import {fromEvent, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RepasswordRxService {

    repasswordTap = {
        next: val => {
            const input = Helper.getElement('repeat_password');
            Helper.removeErrorText(input);
            return of(val);
        },
        error: error => {
            const input = Helper.getElement('repeat_password');
            Helper.addErrorText(input, error.message);
            return of(error);
        }
    };

    constructor() {
    }

    validation(actions$): Observable<{}> {
        const password = Helper.getElement('repeat_password');
        const passwordObs = fromEvent(password, 'focusout')
            .pipe(
                map(evt => this.validater(actions$, evt)),
                tap(this.repasswordTap)
            );
        return passwordObs;
    }

    validater(actions$, event, element?) {
        const elem = event.target || element;
        // @ts-ignore
        const passwordValue = Helper.getElement('password').value;
        const value = elem.value;
        if ((value !== '') && (passwordValue !== '') && (value !== passwordValue)) {
            actions$.next({type: 'rePasswordNotMatch'});
            throw new Error('passwords do not match');
        } else {
            actions$.next({type: 'repasswordValid'});
            return event || true;
        }
    }

    _subscribe(passwordObs: Observable<{}>, callback?) {
        passwordObs.subscribe(value => {
            if (!!callback) {
                callback();
            }
        }, error => {
            if (!!callback) {
                callback();
            }
            this._subscribe(passwordObs);
        });
    }
}
