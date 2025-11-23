import Search from "../../components/form/search/search_box";
import SearchResults from "../../components/form/search/search_result";
import Carousel1 from '../../components/Carousel/Carousel1';
import Carousel2 from '../../components/Carousel/Carousel2';
import Carousel3 from '../../components/Carousel/Carousel3';
import InsertProductB from "../../components/button/InsertProduct_botton";  
import useProducts from '../../hooks/UseProducts';
import useSearchProducts from '../../hooks/useSearchProducts';
import MainLayout from "../../layouts/MainLayout";

export default function Main() {
  const { products, loading, error } = useProducts();
  const { searchTerm, setSearchTerm, filteredProducts } = useSearchProducts(products);

  const cards = products.map((p) => ({
    title: p.product_detail,
    description: `ราคาเริ่มต้น: ${p.starting_price} บาท`,
    image: p.image_url ? `http://localhost:5000/${p.image_url}` : "https://via.placeholder.com/150",
  }));

  if (loading) return <p>กำลังโหลดสินค้าจาก server...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8 min-h-80 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-30">
          Welcome to Main Page
        </h1>

        {/* Search box */}
        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        {/* ผลลัพธ์ search */}
        <SearchResults filteredProducts={filteredProducts} />

        <InsertProductB />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left w-full">
          สินค้าประมูลวันนี้
        </h2>
        <Carousel2 cards={cards} />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left w-full">
          ห้องประมูล
        </h2>
        <Carousel3 cards={cards} />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left w-full">
          สินค้า
        </h2>
        <Carousel1 cards={cards} />
      </div>
    </MainLayout>
  );
}
