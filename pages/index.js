import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const HomePage = ({ products }) => {
  console.log(products);
  return (
    <div>
      <ul>
        <Link href="/jonel">JONEL</Link>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps = async (context) => {
  console.log("re-generating...", context);
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default HomePage;
