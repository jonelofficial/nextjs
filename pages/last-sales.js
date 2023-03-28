import { useEffect, useState } from "react";

const LastSalesPage = ({ data }) => {
  const [sales, setSales] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://nextjs-c0dc1-default-rtdb.firebaseio.com/sales.json"
      );
      const data = await res.json();

      const transformedData = Object.keys(data).map((key) => ({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      }));

      setSales(transformedData);
    })();
    setIsLoading(false);

    return () => {
      null;
    };
  }, []);

  if (isLoading && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.key}>
            {sale.username} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://nextjs-c0dc1-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await res.json();

  const transformedData = Object.keys(data).map((key) => ({
    id: key,
    username: data[key].username,
    volume: data[key].volume,
  }));

  return { props: { data: transformedData }, revalidate: 10 };
};

export default LastSalesPage;
