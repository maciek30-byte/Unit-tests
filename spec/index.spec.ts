import dayjs from "dayjs";

const { Reservation } = require('../src/index');

describe('Change reservation stay period',()=>{
    const previousDate = dayjs().add(-6, 'day').format(Reservation.DATE_FORMAT);
    const futureDate = dayjs().add(6, 'day').format(Reservation.DATE_FORMAT);
    const arrival = dayjs().add(20, 'day').format(Reservation.DATE_FORMAT);

    it('should throw an error when reservation is not from the future',  ()=> {
        //arrange
        const reservation = new Reservation();
        //act

        //assert
        expect(function(){ reservation.changeStayPeriod(previousDate, arrival)})
            .toThrowError('Date should be from future! :)');
    });
    it('should change arrival when reservation is from the future',  ()=> {
        //arrange
        const reservation = new Reservation();
        //act
        reservation.changeStayPeriod(futureDate, arrival)
        //assert
        expect(reservation.arrival).toBe(arrival);
    });

    it('should change stay length when new value grater than 1',  ()=> {
        //arrange
        const reservation = new Reservation();
        const newStayLength = 5;
        //act
        reservation.changeStayPeriod(futureDate, arrival, newStayLength)
        //assert
        expect(reservation.numberOfNights).toBe(newStayLength);
    });

    it('should throw an error when new value lower than 1',  ()=> {
        //arrange
        const reservation = new Reservation();
        const newStayLength = -5;
        //act

        //assert
        expect(function(){reservation.changeStayPeriod(futureDate, arrival, newStayLength)})
            .toThrowError('Number of nights should be a positive number! :)')
    });

    it('should not change stay length when new value grater than 366',  ()=> {
        //arrange
        const reservation = new Reservation();
        const newStayLength = 400;
        //act
        reservation.changeStayPeriod(futureDate, arrival, newStayLength)
        //assert
        expect(reservation.numberOfNights).not.toBe(newStayLength);
    });
})