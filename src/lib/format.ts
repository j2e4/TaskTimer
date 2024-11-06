export const format = (pattern: string, source: number[]) => {
  return pattern.replace(/%(\d*)d/g, (_, n: string) => {
    return String(source.shift() || 0).padStart(+n, "0");
  });
};
