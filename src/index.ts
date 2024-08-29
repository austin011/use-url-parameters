import { useEffect, useState } from "react";

type KeyToTypedAccessor<T> = {
  [Key in keyof T]: (val: T[Key]) => void;
};

export default function useURLParameters<T extends Record<string, unknown>>(
  props: T,
  setProps: KeyToTypedAccessor<T>
) {
  const [trigger, setTrigger] = useState(false);

  const getSearchParams = () => {
    if (typeof window !== "undefined") {
      const keys = Object.keys(props);

      const searchParams = new URLSearchParams(window.location.search);

      const vals = {} as Record<string, string | null>;

      keys.forEach((key) => {
        const val = searchParams.get(key);

        if (val !== undefined) {
          vals[key] = val;
        }
      });

      return vals;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const searchParams = getSearchParams();

    Object.entries(searchParams ?? {}).forEach(([key, val]) => {
      if (setProps[key] && val !== null && val !== undefined && val !== "") {
        setProps[key]?.(val as any);
      }
    });

    setTrigger(true);
  }, []);

  useEffect(() => {
    if (trigger) {
      const searchParams = new URLSearchParams(window.location.search);

      Object.entries(props).forEach(([key, val]) => {
        if (val !== null && val !== undefined) {
          searchParams.set(key, String(val));

          window.history.replaceState({}, "", `?${searchParams.toString()}`);
        }
        if (val === "") {
          searchParams.delete(key);
          window.history.replaceState({}, "", `?${searchParams.toString()}`);
        }
      });
    }
  }, Object.values(props));

  const searchParams = getSearchParams();

  return {
    hasURLParameters: Object.values(props).some(
      (val) => val !== null && val !== undefined && val !== ""
    ),
  };
}
