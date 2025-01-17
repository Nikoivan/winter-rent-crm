import moment from 'moment';
import { isCities, isDay } from './typeguards';
import { CalendarSliceState, DayType, RentFormFields, RentPieceNames, ValidationResult } from './calendar.types';

export type FullDate = {
  year: string;
  month: string;
  date: string;
};

export type CellType = {
  date: string;
  prop: null | string;
  fullDate: FullDate;
};

function getFirstMonday(date: Date): moment.Moment {
  if (moment(date).weekday() === 1) {
    return moment(date);
  }

  if (moment(date).weekday() === 0) {
    return moment(date).day(-6);
  }

  return moment(date).weekday(1);
}

function getLastSunday(date: Date): moment.Moment {
  const end = moment(date).endOf('month');
  if (end.weekday() === 0) {
    return end;
  }

  return end.day(7);
}

function getCell(currentDate: moment.Moment, date: Date) {
  return {
    fullDate: { year: currentDate.format('YYYY'), month: currentDate.format('MM'), date: currentDate.format('DD') },
    date: currentDate.format('D'),
    prop: currentDate.format('MM') === moment(date).format('MM') ? null : ' Calendar-OtherMonth'
  };
}

export default function getNewArr(date: Date): CellType[][] {
  const amountCells = [];

  const lastSunday = getLastSunday(date);
  let currentDate = getFirstMonday(date);

  while (
    !(currentDate.format('MM') === lastSunday.format('MM') && currentDate.format('DD') === lastSunday.format('DD'))
  ) {
    amountCells.push(getCell(currentDate, date));
    currentDate = currentDate.add(1, 'day');
  }

  amountCells.push(getCell(lastSunday, date));

  const weeksCount = amountCells.length / 7;
  const weeks = [];
  let index = 0;

  for (let i = 0; i < weeksCount; i += 1) {
    const week = [];
    for (let q = 0; q < 7; q += 1) {
      week.push(amountCells[index]);
      index += 1;
    }
    weeks.push(week);
  }

  return weeks;
}

export function getPathByFulldate(fullDate: FullDate): string {
  const { year, month, date } = fullDate;

  return `${date}-${month}-${year}`;
}

export function validatePhone(phone: unknown): boolean {
  const isNumber = typeof phone === 'number';

  if (!phone || (typeof phone !== 'string' && !isNumber)) {
    return false;
  }

  const clearPhone: string = (isNumber ? String(phone) : phone).replace('+', '').replace(' ', '');

  return /^[+7-9|][\d ]{10,11}/.test(clearPhone);
}

export function validateDialogForm(value: Record<string, unknown>): ValidationResult {
  const result = {
    name: true,
    peopleAmount: true,
    tel: true,
    city: true
  };

  if (!('name' in value) || typeof value.name !== 'string' || value.name === '') {
    result.name = false;
  }
  if (
    !('tel' in value) ||
    (typeof value.tel !== 'string' && typeof value.tel !== 'number') ||
    !validatePhone(value.tel)
  ) {
    result.tel = false;
  }
  if (
    !('peopleAmount' in value) ||
    typeof value.peopleAmount !== 'number' ||
    value.peopleAmount === 0 ||
    value.peopleAmount > 40
  ) {
    result.peopleAmount = false;
  }
  if (!('city' in value) || !isCities(value.city)) {
    result.city = false;
  }

  return result;
}

export function validateRentForm(form: RentFormFields): Record<keyof RentFormFields, boolean> {
  const { name, gender, height, size, amount } = form;
  const validation = {
    name: true,
    gender: true,
    height: true,
    size: true,
    amount: true
  };

  if (!name) {
    validation.name = false;
  }

  const needsAmount =
    name === RentPieceNames.GLASSES || name === RentPieceNames.GLOVES || name === RentPieceNames.TUBING;

  if (needsAmount && (!amount || typeof amount !== 'number')) {
    validation.amount = false;
  }

  if (needsAmount) {
    return validation;
  }

  if (!gender || (gender !== 'М' && gender !== 'Ж')) {
    validation.gender = false;
  }

  if (!size || typeof size !== 'number') {
    validation.size = false;
  }

  if (name === RentPieceNames.BOOTS || name === RentPieceNames.JACKET || name === RentPieceNames.PANTS) {
    return validation;
  }

  if (!height || typeof height !== 'number') {
    validation.height = false;
  }

  return validation;
}

export function getCitiesTabs(day?: DayType): string[] {
  const cities: string[] = [];

  if (day && day.records.length > 0) {
    for (const record of day.records) {
      if (!cities.includes(record.city)) {
        cities.push(record.city);
      }
    }
  }

  return cities;
}

export function getInitialState(): CalendarSliceState {
  const jsonState = window.localStorage.getItem('records-calendar');
  const currentCalendarState: CalendarSliceState = {
    days: []
  };

  if (jsonState) {
    try {
      const days = JSON.parse(jsonState);

      if (!!days && Array.isArray(days) && days.every(isDay)) {
        currentCalendarState.days = days;
      }
    } catch {
      // do nothing
    }
  }

  return currentCalendarState;
}

export function getLabelByRentFormField(item: Partial<RentFormFields>): string {
  const elements = Object.values(item).filter(Boolean);

  return elements.join(', ');
}
