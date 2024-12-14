import { useState } from "react";
import { useDebounce } from "react-use";

function useDebouncedInput(defaultval: string) {
    const [value, setValue] = useState(defaultval);
    const [debouncedValue, setDebouncedValue] = useState(defaultval);

    useDebounce(
        () => {
            setDebouncedValue(value);
        },
        750,
        [value]
    );

    return [
        value,
        debouncedValue,
        setValue

    ] as const;

}

export { useDebouncedInput }