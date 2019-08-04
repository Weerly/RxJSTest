import {AfterViewInit, Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {map, publishReplay, refCount, scan, startWith, tap} from 'rxjs/operators';
import IGlobalState from './interfaces/IGlobalState';
import IAction from './interfaces/IAction';
import {Helper} from './helper';
import {StateManService} from './services/state-man.service';
import {EmailRxService} from './services/email-rx.service';
import {PasswordRxService} from './services/password-rx.service';
import {RepasswordRxService} from './services/repassword-rx.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'RxProject';
    isDisabled = true;

    startGlobalValid: IGlobalState = {
        isAllValid: false,
        isEmailValid: false,
        isPasswordValid: false,
        isRePasswordValid: false
    };

    isfirstPasswordOut = false;

    actions$: Subject<IAction> = new Subject<IAction>();

    state$: Observable<IGlobalState> =
        this.actions$.pipe(
            startWith(this.startGlobalValid),
            scan(this.stateMan.stateReducer),
            publishReplay(1),
            refCount()
        );

    constructor(
        private stateMan: StateManService,
        private emailRx: EmailRxService,
        private passwordRx: PasswordRxService,
        private repasswordRx: RepasswordRxService) {
    }

    registerClick() {
        return fromEvent(Helper.getElement('register'), 'click')
            .pipe(
                map(event => (this.emailRx.validater(this.actions$, {}, Helper.getElement('email'))) ? event : false),
                tap(this.emailRx.emailTap),
                map(event => (this.passwordRx.validater(this.actions$, {}, Helper.getElement('password'))) ? event : false),
                tap(this.passwordRx.passwordTap),
                map(event => (this.repasswordRx.validater(this.actions$, {}, Helper.getElement('repeat_password'))) ? event : false),
                tap(this.repasswordRx.repasswordTap),
                tap(() => alert('You have already registered'))
            );
    }

    registerSubscribe(registerObj: Observable<{}>) {
        registerObj.subscribe(
            value => console.log(value),
            error => this.registerSubscribe(registerObj));
    }

    ngAfterViewInit() {
        this.emailRx._subscribe(this.emailRx.validation(this.actions$));
        this.passwordRx._subscribe(
            this.passwordRx.validation(this.actions$),
            () => {
                if (!this.isfirstPasswordOut) {
                    this.isfirstPasswordOut = true;
                    this.repasswordRx._subscribe(this.repasswordRx.validation(this.actions$));
                }
            });

        this.state$.subscribe(
            state => {
                const button = Helper.getElement('register');
                this.isDisabled = !state.isAllValid;
                // @ts-ignore
                button.disabled = !state.isAllValid;
            }
        );
        this.registerSubscribe(this.registerClick());
    }

    ngOnInit() {
    }
}
