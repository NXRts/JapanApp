const today = new Date("2026-05-06T00:00:00");
const endDate = new Date(today);
endDate.setDate(today.getDate() + (6 - today.getDay()));

const startDate = new Date(endDate);
startDate.setDate(endDate.getDate() - 370);

const TOTAL_WEEKS = 53;
let lastDateStr = "";

for (let w = 0; w < TOTAL_WEEKS; w++) {
  for (let d = 0; d < 7; d++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + w * 7 + d);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    lastDateStr = `${y}-${m}-${day}`;
  }
}
console.log("endDate:", endDate);
console.log("startDate:", startDate);
console.log("Last cell date:", lastDateStr);
