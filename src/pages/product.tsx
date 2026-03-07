import ProductPage from "../components/Product/ProductPage";
import Layout from "../components/Layout/Layout";
export function meta() {
  return [
    { title: "Product" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = () => {
  return (
    <Layout title="Товар">
      <ProductPage />
    </Layout>
  );
};
export default Home;
