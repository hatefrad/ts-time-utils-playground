export interface Example {
  title: string;
  description: string;
  code: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  examples: Example[];
}

export const categories: Category[] = [
  {
    name: 'Format',
    slug: 'format',
    description: 'Format durations, time ago strings, and custom date formats',
    examples: [
      {
        title: 'Format Duration',
        description: 'Convert milliseconds to human-readable duration strings',
        code: `import { formatDuration, timeAgo, parseDuration } from 'ts-time-utils/format';

// Format milliseconds to readable duration
console.log(formatDuration(65000));
// "1 minute, 5 seconds"

console.log(formatDuration(65000, { short: true }));
// "1m 5s"

console.log(formatDuration(90061000, { maxUnits: 2 }));
// "1 day, 1 hour"

// Time ago strings
console.log(timeAgo(new Date(Date.now() - 60000)));
// "1 minute ago"

console.log(timeAgo(new Date(Date.now() + 3600000)));
// "in 1 hour"

// Parse duration strings back to ms
console.log(parseDuration('1h 30m'));
// 5400000`
      },
      {
        title: 'Format Date',
        description: 'Format dates using custom patterns',
        code: `import { formatDate, formatTime } from 'ts-time-utils/format';

const date = new Date('2025-09-14T14:30:45');

// Custom date formatting
console.log(formatDate(date, 'YYYY-MM-DD'));
// "2025-09-14"

console.log(formatDate(date, 'MMMM Do, YYYY'));
// "September 14th, 2025"

console.log(formatDate(date, 'ddd, MMM D'));
// "Sun, Sep 14"

// Format time
console.log(formatTime(date, '12h'));
// "2:30 PM"

console.log(formatTime(date, '24h'));
// "14:30"`
      }
    ]
  },
  {
    name: 'Calculate',
    slug: 'calculate',
    description: 'Date arithmetic, differences, and business day calculations',
    examples: [
      {
        title: 'Date Differences',
        description: 'Calculate the difference between dates in any unit',
        code: `import { differenceInUnits, addTime, subtractTime } from 'ts-time-utils/calculate';

const date1 = new Date('2025-01-01');
const date2 = new Date('2025-09-14');

// Get difference in various units
console.log(differenceInUnits(date1, date2, 'days'));
// 256

console.log(differenceInUnits(date1, date2, 'months'));
// 8

console.log(differenceInUnits(date1, date2, 'weeks'));
// 36

// Add/subtract time
console.log(addTime(new Date(), 5, 'hours'));
console.log(subtractTime(new Date(), 3, 'days'));`
      },
      {
        title: 'Start/End of Period',
        description: 'Get the start or end of time periods',
        code: `import { startOf, endOf, businessDaysBetween } from 'ts-time-utils/calculate';

const date = new Date('2025-09-14T14:30:45');

// Start of periods
console.log(startOf(date, 'day'));
// 2025-09-14T00:00:00

console.log(startOf(date, 'week'));
// Start of week

console.log(startOf(date, 'month'));
// 2025-09-01T00:00:00

// End of periods
console.log(endOf(date, 'day'));
// 2025-09-14T23:59:59.999

console.log(endOf(date, 'month'));
// 2025-09-30T23:59:59.999

// Business days
const start = new Date('2025-09-01');
const end = new Date('2025-09-30');
console.log(businessDaysBetween(start, end));
// Number of weekdays in September`
      }
    ]
  },
  {
    name: 'Validate',
    slug: 'validate',
    description: 'Validate dates, check conditions, and compare dates',
    examples: [
      {
        title: 'Date Validation',
        description: 'Check if dates are valid and meet conditions',
        code: `import { isValidDate, isLeapYear, isWeekend, isPast, isFuture } from 'ts-time-utils/validate';

// Validate dates
console.log(isValidDate(new Date('2025-09-14')));
// true

console.log(isValidDate(new Date('invalid')));
// false

console.log(isValidDate(new Date('2025-13-01')));
// false (no month 13)

// Check conditions
console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2025)); // false

console.log(isWeekend(new Date('2025-09-13')));
// true (Saturday)

console.log(isPast(new Date('2020-01-01'))); // true
console.log(isFuture(new Date('2030-01-01'))); // true`
      },
      {
        title: 'Date Comparisons',
        description: 'Compare dates and check relationships',
        code: `import { isSameDay, isSameWeek, isSameMonth } from 'ts-time-utils/validate';
import { isBetween } from 'ts-time-utils/calculate';

const date1 = new Date('2025-09-14T10:00');
const date2 = new Date('2025-09-14T20:00');
const date3 = new Date('2025-09-15T10:00');

// Same period checks
console.log(isSameDay(date1, date2)); // true
console.log(isSameDay(date1, date3)); // false

console.log(isSameWeek(date1, date3)); // true
console.log(isSameMonth(date1, date3)); // true

// Check if between
const start = new Date('2025-09-01');
const end = new Date('2025-09-30');
console.log(isBetween(date1, start, end)); // true`
      }
    ]
  },
  {
    name: 'Constants',
    slug: 'constants',
    description: 'Time conversion constants and shared utility types',
    examples: [
      {
        title: 'Time Conversion Constants',
        description: 'Use built-in constants instead of repeating conversion math',
        code: `import {
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_DAY,
  SECONDS_PER_HOUR,
} from 'ts-time-utils/constants';

const timeoutMinutes = 15;
const timeoutMs = timeoutMinutes * MILLISECONDS_PER_MINUTE;
console.log(timeoutMs);
// 900000

const eventDurationHours = 36;
console.log(eventDurationHours * MILLISECONDS_PER_HOUR);
// 129600000

console.log(MILLISECONDS_PER_DAY);
// 86400000

console.log(SECONDS_PER_HOUR);
// 3600`
      },
      {
        title: 'Typed Time Units',
        description: 'Reuse the shared time-unit types in your own helpers',
        code: `import type { TimeUnit, FormatOptions } from 'ts-time-utils/constants';

function normalizeUnit(unit: TimeUnit): TimeUnit {
  if (unit === 'hours') return 'hour';
  if (unit === 'minutes') return 'minute';
  return unit;
}

const options: FormatOptions = {
  short: true,
  maxUnits: 2,
};

console.log(normalizeUnit('hours'));
// "hour"

console.log(options);
// { short: true, maxUnits: 2 }`
      }
    ]
  },
  {
    name: 'Duration',
    slug: 'duration',
    description: 'Immutable Duration class with arithmetic operations',
    examples: [
      {
        title: 'Create Durations',
        description: 'Create Duration objects from various sources',
        code: `import { Duration } from 'ts-time-utils/duration';

// Create from units
const d1 = Duration.fromHours(2.5);
console.log(d1.toString()); // "2h 30m"

const d2 = Duration.fromMinutes(90);
console.log(d2.toString()); // "1h 30m"

// Create from object
const d3 = new Duration({ hours: 1, minutes: 30, seconds: 45 });
console.log(d3.toString()); // "1h 30m 45s"

// Parse from string
const d4 = Duration.fromString('2h 15m 30s');
console.log(d4.milliseconds); // 8130000

// From date range
const start = new Date('2025-09-14T09:00');
const end = new Date('2025-09-14T17:30');
const d5 = Duration.between(start, end);
console.log(d5.toString()); // "8h 30m"`
      },
      {
        title: 'Duration Arithmetic',
        description: 'Add, subtract, multiply, and divide durations',
        code: `import { Duration, sumDurations, maxDuration } from 'ts-time-utils/duration';

const d1 = Duration.fromHours(2);
const d2 = Duration.fromMinutes(30);

// Arithmetic (immutable - returns new Duration)
const sum = d1.add(d2);
console.log(sum.toString()); // "2h 30m"

const diff = d1.subtract(d2);
console.log(diff.toString()); // "1h 30m"

const doubled = d1.multiply(2);
console.log(doubled.toString()); // "4h"

const half = d1.divide(2);
console.log(half.toString()); // "1h"

// Comparisons
console.log(d1.greaterThan(d2)); // true
console.log(d1.equals(Duration.fromMinutes(120))); // true

// Array utilities
const durations = [d1, d2, Duration.fromHours(1)];
console.log(sumDurations(...durations).toString()); // "3h 30m"
const longest = maxDuration(...durations);
if (longest) {
  console.log(longest.toString()); // "2h"
}`
      }
    ]
  },
  {
    name: 'Timezone',
    slug: 'timezone',
    description: 'Timezone conversions, DST handling, and zone comparisons',
    examples: [
      {
        title: 'Timezone Conversions',
        description: 'Work with dates across timezones',
        code: `import { formatInTimeZone, getTimezoneOffset, convertBetweenZones } from 'ts-time-utils/timezone';

const date = new Date('2025-09-14T12:00:00Z');

// Format in specific timezone
console.log(formatInTimeZone(date, 'America/New_York'));
// Shows time in New York

console.log(formatInTimeZone(date, 'Asia/Tokyo'));
// Shows time in Tokyo

console.log(formatInTimeZone(date, 'Europe/London'));
// Shows time in London

// Get timezone offset
console.log(getTimezoneOffset('America/Los_Angeles'));
// -7 or -8 depending on DST

// Convert between zones
const converted = convertBetweenZones(date, 'UTC', 'America/New_York');
console.log(converted);`
      },
      {
        title: 'DST Detection',
        description: 'Detect and handle Daylight Saving Time',
        code: `import { isDST, getNextDSTTransition, isValidTimeZone } from 'ts-time-utils/timezone';

// Check if timezone is valid
console.log(isValidTimeZone('America/New_York')); // true
console.log(isValidTimeZone('Invalid/Zone')); // false

// Check if date is in DST
const summer = new Date('2025-07-14');
const winter = new Date('2025-01-14');

console.log(isDST(summer, 'America/New_York')); // true
console.log(isDST(winter, 'America/New_York')); // false

// Find next DST transition
const nextTransition = getNextDSTTransition(new Date('2025-01-14'), 'America/New_York');
console.log(nextTransition);`
      }
    ]
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    description: 'ISO weeks, quarters, holidays, and calendar grids',
    examples: [
      {
        title: 'Week & Quarter',
        description: 'Get week numbers, quarters, and calendar info',
        code: `import { getWeekNumber, getQuarter, getDaysInMonth, getDaysInYear } from 'ts-time-utils/calendar';

const date = new Date('2025-09-14');

// ISO week number
console.log(getWeekNumber(date)); // 37

// Quarter
console.log(getQuarter(date)); // 3

// Days in month/year
console.log(getDaysInMonth(2025, 8)); // 30 (September, zero-based month)
console.log(getDaysInMonth(2024, 1)); // 29 (February in a leap year)
console.log(getDaysInYear(2024)); // 366
console.log(getDaysInYear(2025)); // 365`
      },
      {
        title: 'US Holidays',
        description: 'Calculate US federal holidays',
        code: `import { getEaster, getUSHolidays, getThanksgivingDay, getMemorialDay } from 'ts-time-utils/calendar';

// Easter (complex calculation!)
console.log(getEaster(2025));

// Get all US holidays for a year
const holidays = getUSHolidays(2025);
holidays.forEach(h => {
  console.log(\`\${h.name}: \${h.date.toDateString()}\`);
});

// Specific holidays
console.log('Thanksgiving 2025:', getThanksgivingDay(2025));
console.log('Memorial Day 2025:', getMemorialDay(2025));`
      }
    ]
  },
  {
    name: 'DateRange',
    slug: 'dateRange',
    description: 'Date range operations: overlap, gaps, merge, split',
    examples: [
      {
        title: 'Merge & Overlap',
        description: 'Merge overlapping ranges and check overlaps',
        code: `import { mergeDateRanges, dateRangeOverlap, getIntersection } from 'ts-time-utils/dateRange';

// Check overlap
const range1 = {
  start: new Date('2025-01-01'),
  end: new Date('2025-01-15')
};
const range2 = {
  start: new Date('2025-01-10'),
  end: new Date('2025-01-20')
};

console.log(dateRangeOverlap(range1, range2)); // true

// Get intersection
const intersection = getIntersection(range1, range2);
console.log(intersection);
// { start: Jan 10, end: Jan 15 }

// Merge overlapping ranges
const ranges = [
  { start: new Date('2025-01-01'), end: new Date('2025-01-10') },
  { start: new Date('2025-01-05'), end: new Date('2025-01-15') },
  { start: new Date('2025-01-20'), end: new Date('2025-01-25') },
];

const merged = mergeDateRanges(ranges);
console.log(merged.length); // 2 ranges after merge`
      },
      {
        title: 'Find Gaps',
        description: 'Find available time slots between busy periods',
        code: `import { findGaps, splitRange } from 'ts-time-utils/dateRange';

// Find gaps between busy times (e.g., meetings)
const busyTimes = [
  { start: new Date('2025-01-01T09:00'), end: new Date('2025-01-01T11:00') },
  { start: new Date('2025-01-01T14:00'), end: new Date('2025-01-01T16:00') },
];

const workday = {
  start: new Date('2025-01-01T08:00'),
  end: new Date('2025-01-01T18:00'),
};

const gaps = findGaps(busyTimes, workday);
gaps.forEach(gap => {
  console.log(\`Free: \${gap.start.toTimeString().slice(0,5)} - \${gap.end.toTimeString().slice(0,5)}\`);
});
// Free: 08:00 - 09:00
// Free: 11:00 - 14:00
// Free: 16:00 - 18:00

// Split range into chunks
const month = {
  start: new Date('2025-01-01'),
  end: new Date('2025-01-31'),
};
const weeks = splitRange(month, 1, 'week');
console.log(\`January has \${weeks.length} weeks\`);`
      }
    ]
  },
  {
    name: 'Recurrence',
    slug: 'recurrence',
    description: 'RRULE-inspired recurring event patterns',
    examples: [
      {
        title: 'Create Recurrences',
        description: 'Define recurring event patterns',
        code: `import { createRecurrence, recurrenceToString } from 'ts-time-utils/recurrence';

// Daily recurrence (every 2 days, 10 times)
const daily = createRecurrence({
  frequency: 'daily',
  interval: 2,
  startDate: new Date('2025-01-01'),
  count: 10,
});

console.log(daily.getNextOccurrence(new Date()));
console.log(daily.getAllOccurrences().length); // 10

// Weekly on specific days
const weekly = createRecurrence({
  frequency: 'weekly',
  interval: 1,
  startDate: new Date('2025-01-01'),
  byWeekday: [1, 3, 5], // Mon, Wed, Fri
});

console.log(recurrenceToString(weekly.rule));
// "Every week on Monday, Wednesday, Friday"

// Monthly on the 15th
const monthly = createRecurrence({
  frequency: 'monthly',
  interval: 1,
  startDate: new Date('2025-01-01'),
  byMonthDay: [15],
  until: new Date('2025-12-31'),
});

const inQ2 = monthly.getOccurrencesBetween(
  new Date('2025-04-01'),
  new Date('2025-06-30')
);
console.log(\`Q2 occurrences: \${inQ2.length}\`); // 3`
      }
    ]
  },
  {
    name: 'Cron',
    slug: 'cron',
    description: 'Parse and match cron expressions',
    examples: [
      {
        title: 'Cron Matching',
        description: 'Check if dates match cron expressions',
        code: `import { matchesCron, getNextCronDate, isValidCron, CRON_PRESETS } from 'ts-time-utils/cron';

// Validate cron expression
console.log(isValidCron('0 9 * * 1-5')); // true
console.log(isValidCron('invalid')); // false

// Check if date matches
const monday9am = new Date('2025-09-15T09:00:00'); // Monday
console.log(matchesCron(monday9am, '0 9 * * 1')); // true (Mon 9am)
console.log(matchesCron(monday9am, '0 9 * * 5')); // false (not Fri)

// Get next occurrence
const next = getNextCronDate('0 9 * * 1-5'); // Next weekday 9am
console.log('Next weekday 9am:', next);

// Use presets
console.log(CRON_PRESETS.everyDay);   // "0 0 * * *"
console.log(CRON_PRESETS.everyWeek);  // "0 0 * * 0"
console.log(CRON_PRESETS.everyMonth); // "0 0 1 * *"
console.log(CRON_PRESETS.weekdays);   // "0 0 * * 1-5"`
      }
    ]
  },
  {
    name: 'Fiscal',
    slug: 'fiscal',
    description: 'Fiscal year utilities with configurable start month',
    examples: [
      {
        title: 'Fiscal Year Calculations',
        description: 'Work with fiscal years and quarters',
        code: `import { getFiscalYear, getFiscalQuarter, getFiscalPeriodInfo, FISCAL_PRESETS } from 'ts-time-utils/fiscal';

const date = new Date('2025-09-14');

// Calendar year fiscal (Jan start)
console.log(getFiscalYear(date, FISCAL_PRESETS.CALENDAR)); // 2025

// UK/India fiscal (April start)
console.log(getFiscalYear(date, FISCAL_PRESETS.UK_INDIA)); // 2025

// Australia fiscal (July start)
console.log(getFiscalYear(date, FISCAL_PRESETS.AUSTRALIA)); // 2026

// US Federal (October start)
console.log(getFiscalYear(date, FISCAL_PRESETS.US_FEDERAL)); // 2025

// Get fiscal quarter
console.log(getFiscalQuarter(date, { startMonth: 4 })); // Q2 for UK

// Detailed fiscal period info
const info = getFiscalPeriodInfo(date, { startMonth: 4 });
console.log(info);
// { fiscalYear, quarter, month, daysElapsed, daysRemaining, progress }`
      }
    ]
  },
  {
    name: 'Compare',
    slug: 'compare',
    description: 'Sort, group, and analyze date arrays',
    examples: [
      {
        title: 'Sort & Filter',
        description: 'Sort dates and find min/max',
        code: `import { sortDates, minDate, maxDate, closestDate } from 'ts-time-utils/compare';

const dates = [
  new Date('2025-09-15'),
  new Date('2025-01-01'),
  new Date('2025-12-31'),
  new Date('2025-06-15'),
];

// Sort dates
console.log(sortDates(dates, 'asc').map(d => d.toDateString()));
console.log(sortDates(dates, 'desc').map(d => d.toDateString()));

// Find min/max
const earliest = minDate(dates);
const latest = maxDate(dates);
if (earliest && latest) {
  console.log('Earliest:', earliest.toDateString());
  console.log('Latest:', latest.toDateString());
}

// Find closest to target
const target = new Date('2025-07-01');
const closest = closestDate(target, dates);
if (closest) {
  console.log('Closest to July 1:', closest.toDateString());
}`
      },
      {
        title: 'Group Dates',
        description: 'Group dates by year, month, or day of week',
        code: `import { groupDatesByMonth, groupDatesByYear, snapDate } from 'ts-time-utils/compare';

const dates = [
  new Date('2025-01-15'),
  new Date('2025-01-20'),
  new Date('2025-02-10'),
  new Date('2025-02-25'),
  new Date('2025-03-05'),
];

// Group by month (returns Map<string, Date[]>)
const byMonth = groupDatesByMonth(dates);
byMonth.forEach((monthDates, month) => {
  console.log(\`\${month}: \${monthDates.length} dates\`);
});

// Snap to intervals (intervalMinutes)
const meeting = new Date('2025-09-14T14:37:00');
console.log('Original:', meeting.toTimeString());
console.log('Snapped to 15min:', snapDate(meeting, 15).toTimeString());
console.log('Snapped to hour:', snapDate(meeting, 60).toTimeString());`
      }
    ]
  },
  {
    name: 'Iterate',
    slug: 'iterate',
    description: 'Iterate through date sequences and count dates',
    examples: [
      {
        title: 'Generate Date Arrays',
        description: 'Create arrays of dates in ranges',
        code: `import { eachDay, eachWeekday, eachWeek, eachMonth } from 'ts-time-utils/iterate';

const start = new Date('2025-01-01');
const end = new Date('2025-01-15');

// Each day
const days = eachDay(start, end);
console.log(\`\${days.length} days\`); // 15

// Weekdays only
const weekdays = eachWeekday(start, end);
console.log(\`\${weekdays.length} weekdays\`); // 11

// Each week
const weeks = eachWeek(start, new Date('2025-01-31'));
console.log(\`\${weeks.length} weeks\`);

// Each month in a year
const months = eachMonth(
  new Date('2025-01-01'),
  new Date('2025-12-31')
);
console.log(\`\${months.length} months\`); // 12`
      },
      {
        title: 'Count Dates',
        description: 'Count days, weekdays, and weekends in ranges',
        code: `import { countDays, countWeekdays, countWeekendDays, filterDays } from 'ts-time-utils/iterate';

const start = new Date('2025-01-01');
const end = new Date('2025-01-31');

console.log(\`Total days: \${countDays(start, end)}\`);
console.log(\`Weekdays: \${countWeekdays(start, end)}\`);
console.log(\`Weekend days: \${countWeekendDays(start, end)}\`);

// Filter with custom condition
const fridays = filterDays(start, end, date => date.getDay() === 5);
console.log(\`Fridays in January: \${fridays.length}\`);`
      }
    ]
  },
  {
    name: 'Parse',
    slug: 'parse',
    description: 'Parse dates from various formats and strings',
    examples: [
      {
        title: 'Parse Dates',
        description: 'Parse dates from multiple formats',
        code: `import { parseDate, parseTime, guessDateFormat } from 'ts-time-utils/parse';

// Parse various date formats
console.log(parseDate('2025-09-14')); // ISO format
console.log(parseDate('09/14/2025')); // US format
console.log(parseDate('Sep 14, 2025')); // Named month

// Parse time strings
console.log(parseTime('14:30')); // { hour: 14, minute: 30 }
console.log(parseTime('2:30 PM')); // { hour: 14, minute: 30 }
console.log(parseTime('9:15am')); // { hour: 9, minute: 15 }

// Auto-detect format
console.log(guessDateFormat('2025-09-14')); // 'YYYY-MM-DD'
console.log(guessDateFormat('09/14/2025')); // 'MM/DD/YYYY'`
      }
    ]
  },
  {
    name: 'NaturalLanguage',
    slug: 'naturalLanguage',
    description: 'Parse human-friendly date strings',
    examples: [
      {
        title: 'Natural Date Parsing',
        description: 'Parse dates from natural language',
        code: `import { parseNaturalDate, extractDatesFromText } from 'ts-time-utils/naturalLanguage';

// Parse natural language
console.log('tomorrow:', parseNaturalDate('tomorrow'));
console.log('next Friday:', parseNaturalDate('next Friday'));
console.log('in 2 weeks:', parseNaturalDate('in 2 weeks'));
console.log('3 days ago:', parseNaturalDate('3 days ago'));
console.log('end of month:', parseNaturalDate('end of month'));

// Extract dates from text
const text = 'Meeting tomorrow at 3pm and lunch next Friday at noon';
const dates = extractDatesFromText(text);

dates.forEach(({ date, text: matched, confidence }) => {
  console.log(\`Found "\${matched}" -> \${date.toDateString()} (confidence: \${confidence})\`);
});`
      }
    ]
  },
  {
    name: 'Chain',
    slug: 'chain',
    description: 'Fluent chainable API for date operations',
    examples: [
      {
        title: 'Fluent Chain API',
        description: 'Chain multiple operations together',
        code: `import { chain } from 'ts-time-utils/chain';

// Chain multiple operations
const result = chain(new Date())
  .startOf('day')
  .add(9, 'hours')
  .add(30, 'minutes')
  .toDate();

console.log('Today at 9:30am:', result);

// Complex chaining
const nextMeeting = chain(new Date())
  .add(1, 'week')
  .startOf('week')  // Monday
  .add(1, 'day')    // Tuesday
  .add(14, 'hours') // 2pm
  .toDate();

console.log('Next Tuesday 2pm:', nextMeeting);

// Get formatted output
const formatted = chain(new Date())
  .add(3, 'days')
  .format('YYYY-MM-DD');

console.log('3 days from now:', formatted);

// Check conditions in chain
const isWeekend = chain(new Date())
  .add(2, 'days')
  .isWeekend();

console.log('Is 2 days from now a weekend?', isWeekend);`
      }
    ]
  },
  {
    name: 'Holidays',
    slug: 'holidays',
    description: 'Public holidays for 20+ countries',
    examples: [
      {
        title: 'International Holidays',
        description: 'Get public holidays for any supported country',
        code: `import { getHolidays, isHoliday, getNextHoliday } from 'ts-time-utils/holidays';

// Get all UK bank holidays for 2025
const ukHolidays = getHolidays(2025, 'UK');
ukHolidays.forEach(h => {
  console.log(\`\${h.name}: \${h.date.toDateString()}\`);
});

// German holidays
const deHolidays = getHolidays(2025, 'DE');
console.log(\`Germany has \${deHolidays.length} public holidays\`);

// Check if a date is a holiday
const christmas = new Date('2025-12-25');
console.log('Is Christmas a US holiday?', isHoliday(christmas, 'US'));
console.log('Is Christmas a JP holiday?', isHoliday(christmas, 'JP'));

// Get the next holiday from today
const nextCA = getNextHoliday(new Date(), 'CA');
console.log('Next Canadian holiday:', nextCA?.name);

// Supported countries:
// UK, NL, DE, CA, AU, IT, ES, CN, IN, US,
// JP, FR, BR, MX, KR, SG, PL, SE, BE, CH`
      }
    ]
  },
  {
    name: 'Locale',
    slug: 'locale',
    description: 'Multi-language formatting with 40+ locales',
    examples: [
      {
        title: 'Localized Formatting',
        description: 'Format dates and relative times in different languages',
        code: `import { formatRelativeTime, formatDateLocale, detectLocale } from 'ts-time-utils/locale';

const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

// Relative time in different languages
console.log(formatRelativeTime(pastDate, { locale: 'en' }));
// "2 hours ago"

console.log(formatRelativeTime(pastDate, { locale: 'es' }));
// "hace 2 horas"

console.log(formatRelativeTime(pastDate, { locale: 'de' }));
// "vor 2 Stunden"

console.log(formatRelativeTime(pastDate, { locale: 'fr' }));
// "il y a 2 heures"

console.log(formatRelativeTime(pastDate, { locale: 'ja' }));
// "2時間前"

// Format dates in locale
const date = new Date('2025-01-15');
console.log(formatDateLocale(date, 'en', 'long'));
// "January 15, 2025"

console.log(formatDateLocale(date, 'fr', 'long'));
// "15 janvier 2025"

console.log(formatDateLocale(date, 'zh', 'long'));
// "2025年1月15日"

// Auto-detect system locale
console.log('Detected locale:', detectLocale());`
      }
    ]
  },
  {
    name: 'Working Hours',
    slug: 'workingHours',
    description: 'Business hours calculations with break support',
    examples: [
      {
        title: 'Business Hours',
        description: 'Calculate working time accounting for schedules',
        code: `import { isWorkingTime, addWorkingDays, workingDaysBetween } from 'ts-time-utils/workingHours';

// Define working hours config
const config = {
  workingDays: [1, 2, 3, 4, 5], // Mon-Fri
  hours: { start: 9, end: 17 },
  breaks: [{ start: 12, end: 13 }] // Lunch break
};

// Check if currently working time
const monday10am = new Date('2025-09-15T10:00:00');
const saturday = new Date('2025-09-13T10:00:00');
const lunchTime = new Date('2025-09-15T12:30:00');

console.log('Mon 10am working?', isWorkingTime(monday10am, config));
// true

console.log('Saturday working?', isWorkingTime(saturday, config));
// false

console.log('During lunch?', isWorkingTime(lunchTime, config));
// false (during break)

// Add working days (skips weekends)
const friday = new Date('2025-09-12');
const afterWorkDays = addWorkingDays(friday, 3, config);
console.log('3 working days after Friday:', afterWorkDays.toDateString());
// Wednesday (skips Sat, Sun)

// Count working days between dates
const start = new Date('2025-09-01');
const end = new Date('2025-09-30');
console.log('Working days in Sep:', workingDaysBetween(start, end, config));`
      }
    ]
  },
  {
    name: 'Serialize',
    slug: 'serialize',
    description: 'Safe JSON date serialization and deserialization',
    examples: [
      {
        title: 'JSON Serialization',
        description: 'Safely serialize and parse dates in JSON',
        code: `import { serializeDate, parseJSONWithDates, stringifyWithDates } from 'ts-time-utils/serialize';

const date = new Date('2025-09-14T12:30:45.123Z');

// Serialize to different formats
console.log(serializeDate(date, { format: 'iso' }));
// "2025-09-14T12:30:45.123Z"

console.log(serializeDate(date, { format: 'epoch' }));
// 1757853045123

console.log(serializeDate(date, { format: 'custom', customFormat: 'YYYY-MM-DD' }));
// "2025-09-14"

// Stringify objects with date fields
const data = {
  id: 1,
  name: 'Meeting',
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: ['important']
};

// Specify which fields are dates
const json = stringifyWithDates(data, ['createdAt', 'updatedAt']);
console.log(json);

// Parse JSON back with dates restored
const parsed = parseJSONWithDates(json, ['createdAt', 'updatedAt']);
console.log(parsed.createdAt instanceof Date); // true
console.log(parsed.updatedAt instanceof Date); // true`
      }
    ]
  },
  {
    name: 'Performance',
    slug: 'performance',
    description: 'Async utilities, benchmarking, and timing',
    examples: [
      {
        title: 'Timing & Benchmarks',
        description: 'Measure performance and control async timing',
        code: `import { sleep, benchmark, Stopwatch, debounce, throttle } from 'ts-time-utils/performance';

// Sleep/delay
async function demo() {
  console.log('Starting...');
  await sleep(1000); // Wait 1 second
  console.log('Done!');
}

// Benchmark a function
async function benchmarkDemo() {
  const results = await benchmark(() => {
    // Heavy operation
    Array.from({ length: 10000 }, (_, i) => i * 2);
  }, 100); // Run 100 times

  console.log(\`Average: \${results.average.toFixed(2)}ms\`);
  console.log(\`Min: \${results.min.toFixed(2)}ms\`);
  console.log(\`Max: \${results.max.toFixed(2)}ms\`);
}

// Stopwatch for manual timing
const stopwatch = new Stopwatch();
stopwatch.start();
// ... do some work ...
stopwatch.pause();
console.log('Paused?', stopwatch.isPaused());
stopwatch.resume();
console.log('Elapsed:', stopwatch.getElapsed(), 'ms');
console.log('Stopped at:', stopwatch.stop(), 'ms');

// Debounce (wait until calls stop)
const debouncedSave = debounce((data) => {
  console.log('Saving:', data);
}, 300);

// Throttle (max once per interval)
const throttledLog = throttle((msg) => {
  console.log(msg);
}, 1000);`
      }
    ]
  },
  {
    name: 'Age',
    slug: 'age',
    description: 'Age calculations and birthday utilities',
    examples: [
      {
        title: 'Age & Birthday',
        description: 'Calculate ages and work with birthdays',
        code: `import { calculateAge, getLifeStage, getNextBirthday, getDaysUntilBirthday } from 'ts-time-utils/age';

const birthDate = new Date('1990-05-15');

// Calculate detailed age
const age = calculateAge(birthDate);
console.log(\`Age: \${age.years} years, \${age.months} months, \${age.days} days\`);
// "Age: 35 years, 4 months, 2 days"

console.log(\`Total months: \${age.totalMonths}\`);
console.log(\`Total days: \${age.totalDays}\`);

// Get life stage
console.log(getLifeStage(new Date('2024-01-15'))); // "infant"
console.log(getLifeStage(new Date('2018-01-15'))); // "child"
console.log(getLifeStage(new Date('2010-01-15'))); // "teen"
console.log(getLifeStage(new Date('1990-01-15'))); // "adult"
console.log(getLifeStage(new Date('1940-01-15'))); // "senior"

// Next birthday
const nextBday = getNextBirthday(birthDate);
console.log('Next birthday:', nextBday.toDateString());

// Days until birthday
const daysLeft = getDaysUntilBirthday(birthDate);
console.log(\`Days until birthday: \${daysLeft}\`);

// Check if birthday is today
const today = new Date();
const isBirthdayToday = calculateAge(birthDate, today).months === 0
  && calculateAge(birthDate, today).days === 0;
console.log('Birthday today?', isBirthdayToday);`
      }
    ]
  },
  {
    name: 'Countdown',
    slug: 'countdown',
    description: 'Timer and countdown utilities',
    examples: [
      {
        title: 'Countdown Timer',
        description: 'Create countdowns with callbacks',
        code: `import { createCountdown, getRemainingTime, formatCountdown } from 'ts-time-utils/countdown';

// Target date (New Year 2026)
const newYear = new Date('2026-01-01T00:00:00');

// Get remaining time
const remaining = getRemainingTime(newYear);
console.log(\`Days: \${remaining.days}\`);
console.log(\`Hours: \${remaining.hours}\`);
console.log(\`Minutes: \${remaining.minutes}\`);
console.log(\`Seconds: \${remaining.seconds}\`);

// Format countdown string
console.log(formatCountdown(newYear));
// "45d 12h 30m 15s"

console.log(formatCountdown(newYear, { units: ['days', 'hours'] }));
// "45d 12h"

console.log(formatCountdown(newYear, { separator: ' : ' }));
// "45d : 12h : 30m : 15s"

// Create interactive countdown
const countdown = createCountdown(newYear, {
  onTick: (remaining) => {
    console.log(\`\${remaining.days}d \${remaining.hours}h \${remaining.minutes}m\`);
  },
  onComplete: () => {
    console.log('Happy New Year!');
  },
  interval: 1000 // Update every second
});

countdown.start();
// countdown.pause();
// countdown.resume();
// countdown.stop();`
      }
    ]
  },
  {
    name: 'Interval',
    slug: 'interval',
    description: 'Time interval operations',
    examples: [
      {
        title: 'Interval Operations',
        description: 'Work with time intervals and check overlaps',
        code: `import {
  createInterval, intervalsOverlap, mergeIntervals,
  subtractInterval, intervalDuration
} from 'ts-time-utils/interval';

// Create intervals
const meeting1 = createInterval('2025-01-15T09:00', '2025-01-15T10:00');
const meeting2 = createInterval('2025-01-15T09:30', '2025-01-15T11:00');
const meeting3 = createInterval('2025-01-15T14:00', '2025-01-15T15:00');

if (meeting1 && meeting2 && meeting3) {
  console.log('Meeting 1:', meeting1.start, '-', meeting1.end);

  // Check overlap
  console.log('1 & 2 overlap?', intervalsOverlap(meeting1, meeting2));
  // true

  console.log('1 & 3 overlap?', intervalsOverlap(meeting1, meeting3));
  // false

  // Merge overlapping intervals
  const allMeetings = [meeting1, meeting2, meeting3];
  const merged = mergeIntervals(allMeetings);
  console.log(\`\${allMeetings.length} meetings merged to \${merged.length}\`);
  // "3 meetings merged to 2"

  // Subtract interval (find free time)
  const workday = createInterval('2025-01-15T08:00', '2025-01-15T18:00');
  if (workday) {
    const freeSlots = subtractInterval(workday, meeting1);
    console.log('Free slots after removing meeting 1:', freeSlots.length);
  }

  // Get interval duration
  console.log('Meeting 1 duration:', intervalDuration(meeting1), 'ms');
}`
      }
    ]
  },
  {
    name: 'Range Presets',
    slug: 'rangePresets',
    description: 'Common date range presets',
    examples: [
      {
        title: 'Date Range Presets',
        description: 'Quick access to common date ranges',
        code: `import {
  today, yesterday, tomorrow,
  lastNDays, nextNDays,
  thisWeek, lastWeek, nextWeek,
  thisMonth, lastMonth, nextMonth,
  quarterRange, thisYear
} from 'ts-time-utils/rangePresets';

// Today's range (start to end of day)
const todayRange = today();
console.log('Today:', todayRange.start, '-', todayRange.end);

// Yesterday and tomorrow
console.log('Yesterday:', yesterday().start.toDateString());
console.log('Tomorrow:', tomorrow().start.toDateString());

// Last N days
const last7 = lastNDays(7);
console.log('Last 7 days:', last7.start.toDateString(), '-', last7.end.toDateString());

// Next N days
const next30 = nextNDays(30);
console.log('Next 30 days:', next30.start.toDateString(), '-', next30.end.toDateString());

// Week ranges
console.log('This week:', thisWeek().start.toDateString());
console.log('Last week:', lastWeek().start.toDateString());
console.log('Next week:', nextWeek().start.toDateString());

// Month ranges
console.log('This month:', thisMonth().start.toDateString());
console.log('Last month:', lastMonth().start.toDateString());

// Quarter and year
console.log('This quarter:', quarterRange().start.toDateString());
console.log('This year:', thisYear().start.toDateString());`
      }
    ]
  },
  {
    name: 'Calendars',
    slug: 'calendars',
    description: 'Non-Gregorian calendars (Hebrew, Islamic, Japanese, etc.)',
    examples: [
      {
        title: 'Calendar Conversions',
        description: 'Convert dates between calendar systems',
        code: `import {
  toHebrewDate, toIslamicDate, toJapaneseDate,
  toBuddhistDate, toPersianDate, getChineseZodiac
} from 'ts-time-utils/calendars';

const date = new Date('2025-09-14');

// Hebrew calendar
const hebrew = toHebrewDate(date);
console.log(\`Hebrew: \${hebrew.year}-\${hebrew.month}-\${hebrew.day}\`);
console.log(\`Calendar: \${hebrew.calendar}\`);
// { year: 5785, month: 6, day: 11, calendar: 'hebrew' }

// Islamic calendar
const islamic = toIslamicDate(date);
console.log(\`Islamic: \${islamic.year}-\${islamic.month}-\${islamic.day}\`);
// { year: 1447, month: 3, day: 11, calendar: 'islamic-umalqura' }

// Japanese calendar (with era)
const japanese = toJapaneseDate(date);
console.log(\`Japanese: \${japanese.era} \${japanese.year}\`);
// { year: 7, era: 'Reiwa', calendar: 'japanese' }

// Buddhist calendar
const buddhist = toBuddhistDate(date);
console.log(\`Buddhist year: \${buddhist.year}\`);
// { year: 2568, ... }

// Persian/Jalali calendar
const persian = toPersianDate(date);
console.log(\`Persian: \${persian.year}-\${persian.month}-\${persian.day}\`);

// Chinese zodiac
console.log('2024 zodiac:', getChineseZodiac(2024)); // 'Dragon'
console.log('2025 zodiac:', getChineseZodiac(2025)); // 'Snake'`
      }
    ]
  },
  {
    name: 'Temporal',
    slug: 'temporal',
    description: 'Temporal API compatibility layer',
    examples: [
      {
        title: 'Temporal-like Objects',
        description: 'Future-proof with Temporal-inspired API',
        code: `import {
  toPlainDate, toPlainDateTime, toZonedDateTime, toInstant
} from 'ts-time-utils/temporal';

// PlainDate - date without time
const date = toPlainDate(2025, 9, 14);
console.log(date.year, date.month, date.day);
// 2025, 9, 14

console.log(date.dayOfWeek);    // 7 (Sunday, ISO)
console.log(date.dayOfYear);    // 257
console.log(date.weekOfYear);   // 37

// Date arithmetic
const nextWeek = date.add({ days: 7 });
console.log(nextWeek.toString()); // "2025-09-21"

const diff = date.until(nextWeek);
console.log(diff.days); // 7

// PlainDateTime - date with time, no timezone
const dt = toPlainDateTime(2025, 9, 14, 10, 30, 0);
console.log(dt.hour, dt.minute); // 10, 30

// ZonedDateTime - date with timezone
const zdt = toZonedDateTime(new Date(), 'America/New_York');
console.log('NY hour:', zdt.hour);
console.log('Timezone:', zdt.timeZone);

// Convert to different zone
const tokyo = zdt.toInstant().toZonedDateTime('Asia/Tokyo');
console.log('Tokyo hour:', tokyo.hour);

// Instant - epoch-based moment in time
const instant = toInstant(Date.now());
console.log('Epoch ms:', instant.epochMilliseconds);

const inUTC = instant.toZonedDateTime('UTC');
console.log('UTC:', inUTC.toString());`
      }
    ]
  },
  {
    name: 'Finance',
    slug: 'finance',
    description: 'Market hours, trading days, settlement dates, and options expiration',
    examples: [
      {
        title: 'Market Hours',
        description: 'Check market open/close times and trading status',
        code: `import { isMarketOpen, isTradingDay, getMarketOpen, getMarketClose, getNextMarketOpen } from 'ts-time-utils/finance';

// Check if market is currently open
console.log('NYSE open now?', isMarketOpen(new Date(), 'NYSE'));

// Check if today is a trading day
console.log('Is trading day?', isTradingDay(new Date()));

// Get market hours for a specific date
const date = new Date('2025-01-15');
console.log('Market opens:', getMarketOpen(date));
console.log('Market closes:', getMarketClose(date));

// Find next market open (skips weekends & holidays)
const nextOpen = getNextMarketOpen(new Date());
console.log('Next market open:', nextOpen);`
      },
      {
        title: 'Trading Days & Settlement',
        description: 'Calculate trading days and settlement dates',
        code: `import { addTradingDays, countTradingDays, eachTradingDay, getSettlementDate, isMarketHoliday } from 'ts-time-utils/finance';

const start = new Date('2025-01-15');

// Add trading days (skips weekends & holidays)
const fiveDaysLater = addTradingDays(start, 5);
console.log('5 trading days later:', fiveDaysLater);

// Count trading days in range
const end = new Date('2025-01-31');
console.log('Trading days:', countTradingDays(start, end));

// Get all trading days in range
const tradingDays = eachTradingDay(start, end);
console.log('First 5 trading days:', tradingDays.slice(0, 5));

// T+2 settlement date
const settlement = getSettlementDate(start, 2);
console.log('T+2 settlement:', settlement);

// Check market holidays
console.log('Is Christmas a holiday?', isMarketHoliday(new Date('2025-12-25')));`
      },
      {
        title: 'Options Expiration',
        description: 'Calculate options expiration dates',
        code: `import { getOptionsExpiration } from 'ts-time-utils/finance';

// Monthly options (3rd Friday)
const monthlyExp = getOptionsExpiration(2025, 1, 'monthly');
console.log('January monthly expiration:', monthlyExp);

// Quarterly options (Mar, Jun, Sep, Dec)
const quarterlyExp = getOptionsExpiration(2025, 3, 'quarterly');
console.log('Q1 quarterly expiration:', quarterlyExp);

// Get expiration for each month
for (let month = 1; month <= 12; month++) {
  const exp = getOptionsExpiration(2025, month, 'monthly');
  console.log(\`\${month}/2025 expiration: \${exp.toDateString()}\`);
}`
      }
    ]
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Medication schedules, shift patterns, on-call rotations, and compliance',
    examples: [
      {
        title: 'Medication Timing',
        description: 'Calculate medication administration times',
        code: `import { getMedicationTimes, getNextMedicationTime, parseMedicationFrequency } from 'ts-time-utils/healthcare';

const today = new Date('2025-01-15');

// QD = once daily
const qdTimes = getMedicationTimes(today, 'QD');
console.log('QD (once daily):', qdTimes);

// BID = twice daily
const bidTimes = getMedicationTimes(today, 'BID');
console.log('BID (twice daily):', bidTimes);

// TID = three times daily
const tidTimes = getMedicationTimes(today, 'TID');
console.log('TID (three times daily):', tidTimes);

// q8h = every 8 hours
const q8hTimes = getMedicationTimes(today, 'q8h');
console.log('q8h (every 8 hours):', q8hTimes);

// Get next medication time after 10am
const next = getNextMedicationTime(new Date('2025-01-15T10:00:00'), 'BID');
console.log('Next BID dose after 10am:', next);

// Parse frequency string
console.log('Parse "bid":', parseMedicationFrequency('bid'));`
      },
      {
        title: 'Shift Scheduling',
        description: 'Generate shift schedules and check assignments',
        code: `import {
  generateShiftSchedule, getShiftForTime, isOnShift,
  calculateRestBetweenShifts, type ShiftConfig
} from 'ts-time-utils/healthcare';

const config: ShiftConfig = {
  pattern: '12hr',
  startTime: { hour: 7, minute: 0 }
};

// Generate 3-day shift schedule
const shifts = generateShiftSchedule(
  new Date('2025-01-15'),
  new Date('2025-01-17'),
  config
);

shifts.forEach((shift, i) => {
  console.log(\`Shift \${i + 1}: \${shift.start.toLocaleString()} - \${shift.end.toLocaleString()}\`);
});

// Get shift for a specific time
const currentShift = getShiftForTime(new Date('2025-01-15T14:00:00'), config);
console.log('Current shift:', currentShift);

// Check if on shift
console.log('On shift at 2pm?', isOnShift(
  new Date('2025-01-15T14:00:00'),
  new Date('2025-01-15T07:00:00'),
  config
));

// Calculate rest between shifts
const rest = calculateRestBetweenShifts(
  new Date('2025-01-15T19:00:00'),
  new Date('2025-01-16T07:00:00')
);
console.log('Rest hours:', rest);`
      },
      {
        title: 'On-Call Rotation',
        description: 'Create and query on-call schedules',
        code: `import { createOnCallRotation, getOnCallStaff, getComplianceDeadline, isWithinComplianceWindow, timeUntilDeadline } from 'ts-time-utils/healthcare';

// Create 1-week on-call rotation
const staff = ['Dr. Smith', 'Dr. Jones', 'Dr. Brown', 'Dr. Wilson'];
const rotation = createOnCallRotation(
  new Date('2025-01-15'),
  new Date('2025-01-22'),
  staff,
  24 // 24-hour shifts
);

rotation.forEach(slot => {
  console.log(\`\${slot.staff}: \${slot.start.toDateString()}\`);
});

// Who's on call at 3am on Jan 16?
const onCall = getOnCallStaff(new Date('2025-01-16T03:00:00'), rotation);
console.log('On call at 3am:', onCall);

// Compliance window (e.g., 72-hour documentation deadline)
const event = new Date('2025-01-15T08:00:00');
const deadline = getComplianceDeadline(event, 72);
console.log('Documentation deadline:', deadline);

// Check if compliant
const documented = new Date('2025-01-17T10:00:00');
console.log('Within window?', isWithinComplianceWindow(documented, deadline));

// Time remaining
const remaining = timeUntilDeadline(new Date(), deadline);
console.log('Time until deadline:', remaining?.toString());`
      }
    ]
  },
  {
    name: 'Scheduling',
    slug: 'scheduling',
    description: 'Slot generation, availability checking, and conflict detection',
    examples: [
      {
        title: 'Generate Time Slots',
        description: 'Create bookable time slots for a day or range',
        code: `import { generateSlots, generateSlotsForRange } from 'ts-time-utils/scheduling';

// Generate 30-minute slots for a day
const slots = generateSlots(new Date('2025-01-15'), { slotDuration: 30 });
console.log(\`Generated \${slots.length} slots\`);

slots.slice(0, 5).forEach(slot => {
  console.log(\`\${slot.start.toLocaleTimeString()} - \${slot.end.toLocaleTimeString()}: \${slot.available ? 'Available' : 'Booked'}\`);
});

// Generate slots for a date range
const range = {
  start: new Date('2025-01-15'),
  end: new Date('2025-01-17')
};
const rangeSlots = generateSlotsForRange(range, { slotDuration: 60 });
console.log(\`Generated \${rangeSlots.length} slots across range\`);`
      },
      {
        title: 'Availability & Conflicts',
        description: 'Check availability and detect booking conflicts',
        code: `import { getAvailableSlots, findNextAvailable, isSlotAvailable, findConflicts, hasConflict } from 'ts-time-utils/scheduling';

// Existing bookings
const bookings = [
  { start: new Date('2025-01-15T10:00'), end: new Date('2025-01-15T11:00'), id: 'meeting-1' },
  { start: new Date('2025-01-15T14:00'), end: new Date('2025-01-15T15:30'), id: 'meeting-2' },
];

// Get available slots
const available = getAvailableSlots(new Date('2025-01-15'), bookings, { slotDuration: 30 });
console.log(\`\${available.length} available slots\`);

// Find next 1-hour slot
const nextSlot = findNextAvailable(new Date('2025-01-15T09:00'), bookings, 60);
console.log('Next 1-hour slot:', nextSlot?.start.toLocaleTimeString());

// Check if specific slot is available
const proposed = { start: new Date('2025-01-15T10:30'), end: new Date('2025-01-15T11:30') };
console.log('Is 10:30-11:30 available?', isSlotAvailable(proposed, bookings));

// Find conflicts
const conflicts = findConflicts(bookings, proposed);
console.log('Conflicts:', conflicts.map(c => c.id));

// Quick conflict check
console.log('Has conflict?', hasConflict(bookings, proposed));`
      },
      {
        title: 'Buffer & Merge',
        description: 'Add buffers between bookings and merge adjacent slots',
        code: `import { addBuffer, removeBuffer, mergeBookings, splitSlot } from 'ts-time-utils/scheduling';

// Add 15-minute buffer around a meeting
const meeting = {
  start: new Date('2025-01-15T10:00'),
  end: new Date('2025-01-15T11:00')
};

const buffered = addBuffer(meeting, 15);
console.log('With buffer:', buffered.start.toLocaleTimeString(), '-', buffered.end.toLocaleTimeString());
// 09:45 - 11:15

const original = removeBuffer(buffered, 15);
console.log('Without buffer:', original.start.toLocaleTimeString(), '-', original.end.toLocaleTimeString());

// Merge adjacent bookings
const bookings = [
  { start: new Date('2025-01-15T09:00'), end: new Date('2025-01-15T10:00') },
  { start: new Date('2025-01-15T10:00'), end: new Date('2025-01-15T11:00') },
  { start: new Date('2025-01-15T14:00'), end: new Date('2025-01-15T15:00') },
];

const merged = mergeBookings(bookings);
console.log(\`\${bookings.length} bookings merged to \${merged.length}\`);

// Split a slot
const slot = { start: new Date('2025-01-15T09:00'), end: new Date('2025-01-15T11:00'), available: true };
const result = splitSlot(slot, new Date('2025-01-15T10:00'));
if (result) {
  const [before, after] = result;
  console.log('Before:', before.start.toLocaleTimeString(), '-', before.end.toLocaleTimeString());
  console.log('After:', after.start.toLocaleTimeString(), '-', after.end.toLocaleTimeString());
}`
      }
    ]
  },
  {
    name: 'Precision',
    slug: 'precision',
    description: 'Nanoseconds, BigInt, DST detection, and leap seconds',
    examples: [
      {
        title: 'High-Precision Utilities',
        description: 'Nanosecond timestamps and advanced date handling',
        code: `import {
  createNanosecondTimestamp, nowNanoseconds,
  toBigIntMs, ValidDate, isInDSTGap, leapSecondsBetween
} from 'ts-time-utils/precision';

// Nanosecond-precision timestamps
const ts = createNanosecondTimestamp(Date.now(), 500000);
console.log('Milliseconds:', ts.milliseconds);
console.log('Nanoseconds:', ts.nanoseconds);
console.log('Total (BigInt):', ts.totalNanoseconds);

// Current time in nanoseconds
const now = nowNanoseconds();
console.log('Now (ns):', now.totalNanoseconds);

// BigInt timestamps for large date ranges
const bigMs = toBigIntMs(new Date());
console.log('BigInt ms:', bigMs);

// Validated dates (never invalid)
const valid = ValidDate.from(new Date('2025-09-14'));
console.log('Valid date:', valid.value);

// Returns null for invalid dates
const maybe = ValidDate.tryFrom(new Date('invalid'));
console.log('Invalid date:', maybe); // null

// DST gap detection
// 2am doesn't exist on DST spring-forward day
const dstGap = new Date('2024-03-10T02:30:00');
console.log('Is in DST gap?', isInDSTGap(dstGap, 'America/New_York'));

// Leap seconds between dates
const date1 = new Date('2015-01-01');
const date2 = new Date('2025-01-01');
const leapSecs = leapSecondsBetween(date1, date2);
console.log(\`Leap seconds between dates: \${leapSecs}\`);`
      }
    ]
  }
];

export const allCategories = categories.map(c => c.slug);
