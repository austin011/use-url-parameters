type KeyToTypedAccessor<T> = {
    [Key in keyof T]: (val: T[Key]) => void;
};
export default function useQueryParameters<T extends Record<string, unknown>>(props: T, setProps: KeyToTypedAccessor<T>): Record<string, string | null> | null;
export {};
