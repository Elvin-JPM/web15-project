import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_URL;

function useProductSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { name, saleParam, minPrice, maxPrice, tagsArray } = query;
  const tags = tagsArray.join(",");
  const sale = saleParam === "Sale" ? true : saleParam === "Buy" ? false : "";

  useEffect(() => {
    setProducts([]);
  }, [name, sale, minPrice, maxPrice, tags]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `${BASE_URL}/products`,
      params: { name, sale, minPrice, maxPrice, tags, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.numFound, res.data.numReturned);
        setProducts((prevProducts) => [...prevProducts, ...res.data.data]);
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel(); // Cleanup function to cancel the request
  }, [name, sale, minPrice, maxPrice, tags, pageNumber]);

  return { loading, error, products, hasMore };
}

export default useProductSearch;
