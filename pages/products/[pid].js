import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct?.title}</h1>
      <p>{loadedProduct?.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async ({ params }) => {
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((prod) => prod.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { loadedProduct: product },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => ({ params: { pid: product.id } }));

  return {
    paths: ids,
    fallback: true,
  };
};

export default ProductDetailPage;
