

import ProductPage from "../components/common/product/ProductPage";
import Layout from "../components/common/layout/Layout";
export function meta() {
    return [
        { title: "Product" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

const Home=()=> {
    return <Layout title="Товар">
        <ProductPage />
    </Layout>
} 
export default  Home