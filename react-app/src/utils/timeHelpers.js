import moment from 'moment';

const parseUTCTime = momentTime =>
  moment(momentTime)
    .utc()
    .format('HH:mm');

const zeroUTCDateTime = momentDate =>
  moment(momentDate)
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
    .utc()
    .toISOString();

export { parseUTCTime, zeroUTCDateTime };
