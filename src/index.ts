import dayjs from "dayjs";

export class Reservation {
    static DATE_FORMAT = 'YYYY-MM-DD'
    arrival:string = dayjs().add(1, 'day').format(Reservation.DATE_FORMAT);
    numberOfNights:number = 1;

    changeStayPeriod(today:string, newArrival:string, newLength?:number){
        const parsedToday = Date.parse(today)
        const actualDate = new Date().getTime()
        if(newLength&&newLength<1) {
            throw new Error('Number of nights should be a positive number! :)')
        }
        if(actualDate > parsedToday) {
            throw new Error('Date should be from future! :)')
        }
        if( newLength && newLength <= 366) {
            this.numberOfNights = newLength || this.numberOfNights;
        }
        this.arrival = newArrival;

    }

}