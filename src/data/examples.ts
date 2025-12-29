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
        code: `import { startOf, endOf, getBusinessDays } from 'ts-time-utils/calculate';

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
console.log(getBusinessDays(start, end));
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
        code: `import { isSameDay, isSameWeek, isSameMonth, isBetween } from 'ts-time-utils/validate';

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
console.log(maxDuration(...durations).toString()); // "2h"`
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
        code: `import { formatInTimeZone, getTimezoneOffset, convertTimezone } from 'ts-time-utils/timezone';

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
const converted = convertTimezone(date, 'UTC', 'America/New_York');
console.log(converted);`
      },
      {
        title: 'DST Detection',
        description: 'Detect and handle Daylight Saving Time',
        code: `import { isDST, getNextDSTTransition, isValidTimezone } from 'ts-time-utils/timezone';

// Check if timezone is valid
console.log(isValidTimezone('America/New_York')); // true
console.log(isValidTimezone('Invalid/Zone')); // false

// Check if date is in DST
const summer = new Date('2025-07-14');
const winter = new Date('2025-01-14');

console.log(isDST(summer, 'America/New_York')); // true
console.log(isDST(winter, 'America/New_York')); // false

// Find next DST transition
const nextTransition = getNextDSTTransition('America/New_York');
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
console.log(getDaysInMonth(9, 2025)); // 30
console.log(getDaysInMonth(2, 2024)); // 29 (leap year)
console.log(getDaysInYear(2024)); // 366
console.log(getDaysInYear(2025)); // 365`
      },
      {
        title: 'US Holidays',
        description: 'Calculate US federal holidays',
        code: `import { getEaster, getUSHolidays, getThanksgiving, getMemorialDay } from 'ts-time-utils/calendar';

// Easter (complex calculation!)
console.log(getEaster(2025));

// Get all US holidays for a year
const holidays = getUSHolidays(2025);
holidays.forEach(h => {
  console.log(\`\${h.name}: \${h.date.toDateString()}\`);
});

// Specific holidays
console.log('Thanksgiving 2025:', getThanksgiving(2025));
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
        code: `import { mergeDateRanges, dateRangeOverlap, dateRangeIntersection } from 'ts-time-utils/dateRange';

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
const intersection = dateRangeIntersection(range1, range2);
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
console.log(CRON_PRESETS.DAILY);    // "0 0 * * *"
console.log(CRON_PRESETS.WEEKLY);   // "0 0 * * 0"
console.log(CRON_PRESETS.MONTHLY);  // "0 0 1 * *"
console.log(CRON_PRESETS.WEEKDAYS); // "0 0 * * 1-5"`
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
        code: `import { sortDates, minDate, maxDate, closestDate, farthestDate } from 'ts-time-utils/compare';

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
console.log('Earliest:', minDate(dates).toDateString());
console.log('Latest:', maxDate(dates).toDateString());

// Find closest to target
const target = new Date('2025-07-01');
console.log('Closest to July 1:', closestDate(dates, target).toDateString());
console.log('Farthest from July 1:', farthestDate(dates, target).toDateString());`
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

// Group by month
const byMonth = groupDatesByMonth(dates);
Object.entries(byMonth).forEach(([month, monthDates]) => {
  console.log(\`\${month}: \${monthDates.length} dates\`);
});

// Snap to intervals (e.g., 15-minute slots)
const meeting = new Date('2025-09-14T14:37:00');
console.log('Original:', meeting.toTimeString());
console.log('Snapped to 15min:', snapDate(meeting, 15, 'minutes').toTimeString());
console.log('Snapped to hour:', snapDate(meeting, 1, 'hours').toTimeString());`
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
        code: `import { parseDate, parseTime, autoDetectFormat } from 'ts-time-utils/parse';

// Parse various date formats
console.log(parseDate('2025-09-14')); // ISO format
console.log(parseDate('09/14/2025')); // US format
console.log(parseDate('14/09/2025', 'DD/MM/YYYY')); // UK format
console.log(parseDate('Sep 14, 2025')); // Named month

// Parse time strings
console.log(parseTime('14:30')); // { hour: 14, minute: 30 }
console.log(parseTime('2:30 PM')); // { hour: 14, minute: 30 }
console.log(parseTime('9:15am')); // { hour: 9, minute: 15 }

// Auto-detect format
console.log(autoDetectFormat('2025-09-14')); // 'YYYY-MM-DD'
console.log(autoDetectFormat('09/14/2025')); // 'MM/DD/YYYY'`
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
  }
];

export const allCategories = categories.map(c => c.slug);
