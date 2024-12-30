import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { DefaultPagination } from "./DefaultPagination";

const mockProducts = Array.from({ length: 20 }, (_, index) => ({
  productCode: `${100 + index}`,
  productName: `Test Product ${index + 1}`,
  productDescription: `Test description for product ${index + 1}`,
  productPrice: Math.floor(Math.random() * 1000 + 1),
  productStock: Math.floor(Math.random() * 100 + 1),
  categories: [{ id: 1, categoryName: "Test Category", discontinued: false }],
  brand: { id: 1, brandName: "Test Brand", discontinued: false },
}));

interface Product {
  productCode: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  categories: { id: number; categoryName: string; discontinued: boolean }[];
  brand: { id: number; brandName: string; discontinued: boolean };
}

const ProductCardGenerator: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
  });
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/productos/");
        const fetchedProducts: Product[] = response.data.results.map((product: any) => ({
          productCode: product.codigo_producto,
          productName: product.nombre_producto,
          productDescription: product.descripcion_producto,
          productPrice: parseFloat(product.precio_producto), 
          productStock: parseInt(product.stock_producto, 10),
          categories: product.categorias.map((cat: any) => ({
            id: cat.id,
            categoryName: cat.nombre_categoria.replace(/_/g, " "), // Reemplazar _ por espacio
            discontinued: cat.descontinuado,
          })),
          brand: {
            id: product.marca.id,
            brandName: product.marca.nombre_marca.replace(/_/g, " "), // Reemplazar _ por espacio
            discontinued: product.marca.descontinuado,
          },
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products, using mock data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según las categorías y marcas seleccionadas
  const filteredProducts = products.filter((product) => {
    const matchCategory = filters.category
      ? product.categories.some((cat) => cat.categoryName === filters.category)
      : true;
    const matchBrand = filters.brand
      ? product.brand.brandName === filters.brand
      : true;
    return matchCategory && matchBrand;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Obtener las categorías y marcas más frecuentes
  const categoryCounts = products.reduce((acc: { [key: string]: number }, product) => {
    product.categories.forEach((cat) => {
      acc[cat.categoryName] = (acc[cat.categoryName] || 0) + 1;
    });
    return acc;
  }, {});
  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  const brandCounts = products.reduce((acc: { [key: string]: number }, product) => {
    acc[product.brand.brandName] = (acc[product.brand.brandName] || 0) + 1;
    return acc;
  }, {});
  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({ category: "", brand: "" });
  };

  return (
    <div className="container mx-auto px-1 sm:px-4 py-8">
      <div className="flex flex-wrap gap-8">
        {/* Filtros en pantallas grandes al costado y arriba en pantallas pequeñas */}
        <div className="w-full lg:w-1/4 lg:ml-4 mb-8 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <div>
            <h4 className="font-semibold">Categoría</h4>
            <ul>
              {topCategories.map((category) => (
                <li key={category}>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setFilters((prev) => ({ ...prev, category }))}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Marca</h4>
            <ul>
              {topBrands.map((brand) => (
                <li key={brand}>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setFilters((prev) => ({ ...prev, brand }))}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="mt-4 text-red-500 text-sm"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        </div>

        {/* Productos */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.productCode}
                name={product.productName}
                price={product.productPrice}
                originalPrice={undefined}
                discount={undefined}
                brand={product.brand.brandName}
                category={product.categories[0]?.categoryName}
                imageUrl="https://via.placeholder.com/300x200?text=Product"
                rating={Math.ceil(Math.random() * 5) + 1}
                soldCount={Math.floor(Math.random() * 5000)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <DefaultPagination
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardGenerator;
