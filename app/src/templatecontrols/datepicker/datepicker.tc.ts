import {register, ui} from 'platypus';

export default class DatePickerTemplateControl extends ui.TemplateControl {
    templateString: string = require('./datepicker.tc.html');
    
    context: any = {};
    
    /**
     * The minimum allowed year
     * @type {number}
     */
    minYear: number = 1930;
    
    /**
     * The maximum allowed year
     * @type {number}
     */
    maxYear: number = 2015;
    
    /**
     * A mapping from an array index (month number - 1) to 
     * the number of days in the month.
     * @type {Array.<number>}
     */
    private monthDaysMap: Array<number> = [
        31, 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    ];
    
    /**
     * A mapping from an array index (month number - 1) to
     * the month name for that month.
     * @type {Array.<string>}
     */
    private months: Array<string> = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    /**
     * The loaded event method for a control. This event is fired after a control has been completely loaded,
     * meaning all of its children have also been loaded and all DOM has been created and populated. It is now 
     * safe for all controls to access, observe, and modify the context property.
     */
    loaded() {
        var day: number = this.context.day,
        month: number = this.context.month,
        year: number = this.context.year;
        
        if (this.utils.isNull(day) || day < 1) {
            day = 1;
        } else if (day > 31) {
            day = 31;
        }
        
        if (this.utils.isNull(month) || month < 1) {
            month = 1;
        } else if (month > 12) {
            month = 12;
        }
        
        if (this.utils.isNull(year) || year < this.minYear) {
            year = this.minYear;
        } else if (year > this.maxYear) {
            year = this.maxYear;
        }
        
        this.context.day = day;
        this.context.month = month;
        this.context.year = year;
        this.updateMonthName();
        this.validate();
    }
    
    /**
     * Inspects the currently selected year, month, and day to determine
     * if the combination is valid. If it is not valid, the day is adjusted
     * to conform the date to a valid combination.
     */
    validate(): void {
        var year: number = this.context.year;
        var month: number = this.context.month;
        var day: number = this.context.day;
        var days: number = this.numberOfDaysInMonth(month);
        
        // If February on a leap year
        if (month === 2 && this.isLeapYear(year)) {
            days = 29;
        }
        
        // If the user selects a day higher than the number of days in the month
        if (day > days) {
            day = days;
            this.context.day = day;
        }
        
        this.updateMonthName();
    }
    
    /**
     * Returns whether the given year is a leap year or not.
     * A year is a leap year if it is evenly divisible by 400, or it is
     * evenly divisible by 4 but not 100.
     * @param {number} year - The 4 digit year.
     * @returns {boolean} True if given year is a leap year, false otherwise.
     */
    private isLeapYear(year: number): boolean {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)){
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * Retrieves the number of days in a given month. Note that February will return
     * 28 regardless.
     * @param {number} month - The number (1-12) representing the month of the year.
     * @returns {number} Number of days in a given month (28 for February).
     */
    private numberOfDaysInMonth(month: number): number {
        // This formula will precisely return the correct number (except for leap year)
        // But why perform calculations when you can look it up in the array in constant time?
        // return 28 + (month + Math.floor(month/8)) % 2 + 2 % month + 2 * Math.floor(1/month);
        
        return this.monthDaysMap[month - 1];
    }
    
    /**
     * Inspects the currently selected month, and updates the context with the
     * month name corresponding to the selected month number
     */
    private updateMonthName(): void {
        var month: number = this.context.month;
        if (month > 0 && month < 13) {
            this.context.monthName = this.months[month - 1];
        }
    }
}

register.control('datepicker', DatePickerTemplateControl);
