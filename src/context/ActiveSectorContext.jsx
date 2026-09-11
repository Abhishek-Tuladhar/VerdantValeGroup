import { createContext, useContext, useMemo, useState } from "react";

const ActiveSectorContext = createContext(null);

export function ActiveSectorProvider({ children }) {
    const [activeSector, setActiveSector] = useState(null);

    const value = useMemo(
        () => ({ activeSector, setActiveSector }),
        [activeSector]
    );

    return (
        <ActiveSectorContext.Provider value={value}>
            {children}
        </ActiveSectorContext.Provider>
    );
}

export function useActiveSector() {
    const ctx = useContext(ActiveSectorContext);
    if (!ctx) {
        throw new Error(
            "useActiveSector must be used inside <ActiveSectorProvider>"
        );
    }
    return ctx;
}