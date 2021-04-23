export function deepClone<T>(object: any): T {
  return JSON.parse(JSON.stringify(object));
}
