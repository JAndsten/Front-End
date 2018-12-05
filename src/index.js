import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CustomerApp from './CustomerApp';
import TrainingApp from './TrainingApp';
// import CalendarApp from './CalendarApp';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
import 'fullcalendar';

ReactDOM.render(<CustomerApp />, document.getElementById('cRoot'));
ReactDOM.render(<TrainingApp />, document.getElementById('tRoot'));
// ReactDOM.render(<CalendarApp />, document.getElementById('kRoot'));


/* I was entirely unable to get the calendar to work.
    Tried many different calendar apps, from React calendars
    to Jquery calendars, but I had no idea how to import the
    data from the trainings into the apps. */

    
$(function() {
    $('#kRoot').fullCalendar({
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        defaultView: 'month'
    })
  });

serviceWorker.register();
