import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

const getSnapshot = () => `/${window.location.hash.replace(/^#?\/?/, "")}`;
const getServerSnapshot = () => "/";

const navigate = (to: string, options: { replace?: boolean; state?: unknown } = {}) => {
  const [path, query] = to.replace(/^#?\/?/, "").split("?");
  const next = `${window.location.pathname}${query ? `?${query}` : window.location.search}#/${path}`;
  if (options.replace) window.history.replaceState(options.state ?? null, "", next);
  else window.history.pushState(options.state ?? null, "", next);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};

export const useHashLocation = (): [string, typeof navigate] => [
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  navigate,
];

useHashLocation.hrefs = (href: string) => `#${href}`;
