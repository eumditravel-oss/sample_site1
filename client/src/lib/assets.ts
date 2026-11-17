export function assetPath(path: string) {
  const clean = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}
