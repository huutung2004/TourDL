const axios = require('../utils/axios.js');
const moment = require('moment');

let orderPage = async (req, res) => {
  try {
    let tourId = req.query.tourId;
    let date = req.query.dateId;
    if (!tourId || !date) {
      return res.render('404.ejs');
    }
    let dataTour;
    try {
      dataTour = await axios.get(
        `http://localhost:3124/api/v1/tours/${tourId}?dateId=${date}`
      );
      let myMoment = moment(dataTour.data.tourCalendars[0].start_date);
      dataTour.data.tourCalendars[0].start_date_format =
        myMoment.format('YYYY-MM-DD');
      if (!dataTour.data.tourCalendars[0].voucher) {
        let option = {
          value: 0,
          type: 1,
        };
        dataTour.data.tourCalendars[0].voucher = option;
      }
    } catch (error) {
      console.log(error);
    }
    return res.render('customer/orderTour.ejs', {
      tour: dataTour.data,
      calendars: dataTour.data.tourCalendars[0],
    });
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }
};

let editInfoPage = (req, res) => {
  try {
    let userId = req.params.id;
    console.log(userId);
    return res.render('customer/editInfoCustomer.ejs');
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }
};
module.exports = {
  orderPage: orderPage,
  editInfoPage: editInfoPage,
};
