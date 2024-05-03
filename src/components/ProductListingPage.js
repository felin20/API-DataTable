



import React, { useState, useEffect } from 'react';
import { Page, Card, DataTable, TextField, ChoiceList, Filters, Banner, EmptyState, Button } from '@shopify/polaris';
import emptyStateImage from './empty-state-image.png';
import ProductModal from './ProductModal';
import AddProductModal from './AddProductModal'; // Import AddProductModal

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false); // State for AddProductModal

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const handleRowClick = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setModalOpen(true); // Open the modal
  };

  const handlePriceRangeChange = (selected) => {
    setPriceRangeFilter(selected[0]);
  };

  const handleCategoryChange = (selected) => {
    setCategoryFilter(selected[0].toLowerCase()); // Convert to lowercase for consistency
  };

  const handleFilterChange = (value) => {
    setFilterValue(value.toLowerCase()); // Convert to lowercase for consistency
  };

  const clearFilters = () => {
    setFilterValue('');
    setPriceRangeFilter('');
    setCategoryFilter('');
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = products.filter(product => {
    const filterTitle = product.title.toLowerCase().includes(filterValue);
    const filterPrice = priceRangeFilter === '' ||
      (parseFloat(product.price) >= parseFloat(priceRangeFilter.split(' - ')[0]) &&
      parseFloat(product.price) <= parseFloat(priceRangeFilter.split(' - ')[1]));
    const filterCategory = categoryFilter === '' ||
      product.category.toLowerCase() === categoryFilter;
    return filterTitle && filterPrice && filterCategory;
  });

  const priceFilterOptions = [
    { label: 'Any', value: '' },
    { label: '$0 - $100', value: '0 - 100' },
    { label: '$100 - $200', value: '100 - 200' },
    { label: '$200 - $1000', value: '200 - 1000' }
  ];

  const categoryFilterOptions = [
    { label: 'Any', value: '' },
    { label: 'Electronics', value: 'electronics' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: 'Jewelry', value: 'jewelery' },
  ];

  const appliedFilters = [];
  if (priceRangeFilter !== '') {
    appliedFilters.push({
      key: 'priceRange',
      label: `Price Range: ${priceRangeFilter}`,
      onRemove: () => setPriceRangeFilter(''),
    });
  }
  if (categoryFilter !== '') {
    appliedFilters.push({
      key: 'category',
      label: `Category: ${categoryFilter}`,
      onRemove: () => setCategoryFilter(''),
    });
  }

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  return (
    <Page title="Product Listing">
      <Card>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            label="Filter by Product Title"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Enter product title"
          />
        </div>
        <Filters
          filters={[
            {
              key: 'priceRange',
              label: 'Price Range',
              filter: (
                <ChoiceList
                  title="Price Range"
                  titleHidden
                  choices={priceFilterOptions}
                  selected={[priceRangeFilter]}
                  onChange={handlePriceRangeChange}
                />
              ),
            },
            {
              key: 'category',
              label: 'Category',
              filter: (
                <ChoiceList
                  title="Category"
                  titleHidden
                  choices={categoryFilterOptions}
                  selected={[categoryFilter]}
                  onChange={handleCategoryChange}
                />
              ),
            },
          ]}
          appliedFilters={appliedFilters}
          onClearAll={clearFilters}
          hideQueryField
        />
        <Button primary onClick={openAddProductModal}>Add Product</Button>
        {loading && <Banner status="info">Loading...</Banner>}
        {error && <Banner status="critical">{error}</Banner>}
        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState
            image={emptyStateImage}
            heading="No products found"
            action={<Button onClick={clearFilters}>Clear Filters</Button>}
          />
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <DataTable
            columnContentTypes={['numeric', 'text', 'text', 'numeric', 'text']}
            headings={['No.', '', 'Product', 'Price', 'Category']}
            rows={filteredProducts.map((product, index) => (
              [
                product.id,
                <button
                  aria-label={`View ${product.title}`}
                  className="product-row-button"
                  onClick={() => handleRowClick(product.id)}
                >
                  <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px' }} />
                </button>,
                product.title,
                `$${product.price}`,
                product.category
              ]
            ))}
            footerContent={`Total products: ${filteredProducts.length}`}
          />
        )}
      </Card>
      <ProductModal
        open={modalOpen}
        onClose={closeModal}
        productId={selectedProduct ? selectedProduct.id : null}
        products={products}
      />
      <AddProductModal
        open={addProductModalOpen}
        onClose={closeAddProductModal}
        onAddProduct={handleAddProduct}
        products={products}
      />
    </Page>
  );
}

export default ProductListingPage;
