import Banner from '@/components/Banner';
import Product from '@/components/Product';
import { Products } from '@/types';

interface Props{
  productData:Products[]
}
export default function Home({ productData }:Props) {
  return (
    <main>
      <div className='max-w-screen-2xl mx-auto'>
        <Banner />
        <div className="relative md:-mt-20 lg:-mt-32 xl:-mt-60 z-20 mb-10">
          <Product productData={productData} />
        </div>
      </div>
    </main>
  )
}

//Server Side Rendering for data fetching
// #NOTE# you cannot use another name instead of "getServerSideProps"
export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const productData = await res.json();
  return { props: { productData } };
}
