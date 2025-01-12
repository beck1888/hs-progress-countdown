export function getTimeDiff(start: Date, end: Date) {
  if (start >= end) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = new Date(start.getTime());
  const e = new Date(end.getTime());
  let years = e.getFullYear() - s.getFullYear();
  if (
    e.getMonth() < s.getMonth() ||
    (e.getMonth() === s.getMonth() && e.getDate() < s.getDate())
  ) {
    years--;
  }
  s.setFullYear(s.getFullYear() + years);
  let months = e.getMonth() - s.getMonth();
  if (months < 0) months += 12;
  if (e.getDate() < s.getDate()) months--;
  s.setMonth(s.getMonth() + months);
  const days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  s.setDate(s.getDate() + days);
  const hours = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60));
  s.setHours(s.getHours() + hours);
  const minutes = Math.floor((e.getTime() - s.getTime()) / (1000 * 60));
  s.setMinutes(s.getMinutes() + minutes);
  const seconds = Math.floor((e.getTime() - s.getTime()) / 1000);
  return { years, months, days, hours, minutes, seconds };
}

export function pad(num: number): string {
  return num.toString().padStart(2, "0");
}