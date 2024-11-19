import { useEffect, useState } from "react";

const useFetch = (uri) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(uri);
                const json = await res.json();
                if (isMounted) setData(json);
            } catch (error) {
                if (isMounted) setError(error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [uri]);

    return { loading, error, data };
};

export default useFetch;