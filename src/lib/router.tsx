import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type RouterContextType = {
  pathname: string;
  params: Record<string, string>;
  search: Record<string, string>;
  navigate: (to: string, options?: { search?: Record<string, string> }) => void;
};

const RouterContext = createContext<RouterContextType>({
  pathname: "/",
  params: {},
  search: {},
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

export function useRouterState<T>(selector?: (s: { location: { pathname: string; search: Record<string, string> } }) => T): T {
  const ctx = useContext(RouterContext);
  const location = { pathname: ctx.pathname, search: ctx.search };
  if (selector) return selector({ location });
  return location as unknown as T;
}

function parseSearch(searchStr: string): Record<string, string> {
  const res: Record<string, string> = {};
  const query = searchStr.startsWith("?") ? searchStr.slice(1) : searchStr;
  if (!query) return res;
  for (const part of query.split("&")) {
    const [k, v] = part.split("=");
    if (k) res[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return res;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname || "/";
  });

  const [search, setSearch] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    return parseSearch(window.location.search);
  });

  const [params, setParams] = useState<Record<string, string>>({});

  const updateStateFromUrl = useCallback(() => {
    const rawPath = window.location.pathname || "/";
    const rawSearch = window.location.search || "";
    setPathname(rawPath);
    setSearch(parseSearch(rawSearch));

    // Match /notes/:id or /notes/$id
    const noteMatch = rawPath.match(/^\/notes\/([^/?#]+)/);
    if (noteMatch) {
      setParams({ id: noteMatch[1] });
    } else {
      setParams({});
    }
  }, []);

  useEffect(() => {
    updateStateFromUrl();
    const onPop = () => updateStateFromUrl();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [updateStateFromUrl]);

  const navigate = useCallback((to: string, options?: { search?: Record<string, string> }) => {
    let target = to;
    if (options?.search && Object.keys(options.search).length > 0) {
      const q = new URLSearchParams(options.search).toString();
      target += (target.includes("?") ? "&" : "?") + q;
    }
    window.history.pushState({}, "", target);
    updateStateFromUrl();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateStateFromUrl]);

  return (
    <RouterContext.Provider value={{ pathname, params, search, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({
  to,
  params,
  search,
  children,
  className,
  onClick,
  ...props
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const { navigate } = useRouter();
  let resolved = to;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      resolved = resolved.replace(`$${k}`, v).replace(`:${k}`, v);
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(resolved, { search });
  };

  return (
    <a href={resolved} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
