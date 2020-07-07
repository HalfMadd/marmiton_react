import moment from 'moment';

class Helpers{

    static getActualDate(){
        return moment().format("YYYY-MM-DDTh:mm:ss");
    }

    static getEndOfWeek(){
        let today = moment();
        return today.endOf('week').format("YYYY-MM-DDTh:mm:ss");
    }

    static extractDayFromDate(date){
        return moment(date).format('DD');
    }

    static extractMonthFromDate(date){
        return moment(date).format('MMM');
    }

    static extractParentCategory(category){
        return category.substr(0, category.indexOf('->'));
    }

}

export default Helpers;
