import moment from "moment";

export const MIN_YEAR = moment().subtract(2, 'years').format('YYYY');
export const MAX_YEAR = moment().add(2, 'years').format('YYYY');

export  const LOCAL_STORAGE_KEY = 'calendarState';