import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');

    context: {
        date: models.IDatePickerDate
    } = {
        date: {}
    };
    
    navigatedTo(): void {
        var currentDate: Date = new Date();
        this.context.date.day = currentDate.getDate();
        this.context.date.month = currentDate.getMonth() + 1;
        this.context.date.year = currentDate.getFullYear();
    }
}

register.viewControl('home-vc', HomeViewControl);
