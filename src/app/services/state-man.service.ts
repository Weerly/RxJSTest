import {Injectable} from '@angular/core';
import IGlobalState from '../interfaces/IGlobalState';
import IAction from '../interfaces/IAction';

@Injectable({
    providedIn: 'root'
})
export class StateManService {

    constructor() {
    }

    stateReducer(state: IGlobalState, action: IAction): IGlobalState {
        switch (action.type) {
            case 'emailEmpty':
            case 'emailWrong':
                return {...state, isEmailValid: false, isAllValid: false};
            case 'passwordEmpty':
            case 'passwordShort':
                return {...state, isPasswordValid: false, isAllValid: false};
            case 'rePasswordNotMatch':
                return {...state, isRePasswordValid: false, isAllValid: false};
            case 'emailValid':
                state = {...state, isEmailValid: true};
                break;
            case 'passwordValid':
                state = {...state, isPasswordValid: true};
                break;
            case 'repasswordValid':
                state = {...state, isRePasswordValid: true};
                break;
            default:
                return state;
        }
        console.log(state);
        const isAllNotValid = Object.keys(state).some(key => key !== 'isAllValid' && !state[key]);
        state = {...state, isAllValid: !isAllNotValid};
        console.log(isAllNotValid);
        console.log(state);
        return state;
    }
}
