import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, TextField, FormLayout, Button, Toast } from '@shopify/polaris';

function AddProductModal({ open, onClose, onAddProduct, products }) {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    price: '',
    category: '',
    description: '',
    rate: '',
    count: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    const { image, title, price, category, description, rate, count } = formData;
    if (!image || !title || !price || !category || !description || !rate || !count) {
      displayError('Please fill in all fields');
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(rate)) || isNaN(Number(count))) {
      displayError('Price, rate, and count must be numbers');
      return;
    }

    if (Number(price) < 0 || Number(rate) < 0 || Number(count) < 0) {
      displayError('Price, rate, and count must be non-negative');
      return;
    }

    const newProduct = {
      id: generateNewProductId(),
      ...formData
    };

    onAddProduct(newProduct);
    onClose();
    resetForm();
  };

  const generateNewProductId = () => {
    const lastProductId = products[products.length - 1]?.id || 0;
    return lastProductId + 1;
  };

  const resetForm = () => {
    setFormData({
      image: '',
      title: '',
      price: '',
      category: '',
      description: '',
      rate: '',
      count: ''
    });
  };

  const displayError = (message) => {
    Toast.show({
      content: message,
      error: true,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Product"
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Image URL"
            value={formData.image}
            onChange={(value) => handleChange('image', value)}
          />
          <TextField
            label="Title"
            value={formData.title}
            onChange={(value) => handleChange('title', value)}
          />
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(value) => handleChange('price', value)}
          />
          <TextField
            label="Category"
            value={formData.category}
            onChange={(value) => handleChange('category', value)}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(value) => handleChange('description', value)}
          />
          <TextField
            label="Rate"
            type="number"
            value={formData.rate}
            onChange={(value) => handleChange('rate', value)}
          />
          <TextField
            label="Count"
            type="number"
            value={formData.count}
            onChange={(value) => handleChange('count', value)}
          />
          <Button primary onClick={handleSubmit}>Add Product</Button>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddProduct: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default AddProductModal;
