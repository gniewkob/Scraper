export function getPages(totalPages: number, current: number, delta = 2): (number | string)[] {
  const included: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - current) <= delta) {
      included.push(i);
    }
  }
  const pages: (number | string)[] = [];
  let last: number | undefined;
  for (const p of included) {
    if (last !== undefined && p - last > 1) {
      pages.push('...');
    }
    pages.push(p);
    last = p;
  }
  return pages;
}
