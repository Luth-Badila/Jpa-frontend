/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
export const useFetch = (fetcher, deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetcher()
            .then((d) => { if (mounted)
            setData(d); })
            .catch((e) => { if (mounted)
            setError(e); })
            .finally(() => { if (mounted)
            setLoading(false); });
        return () => { mounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return { data, setData, loading, error };
};
