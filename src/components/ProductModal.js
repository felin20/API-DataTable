import React from 'react';
import { Modal, TextContainer, Text, Button } from '@shopify/polaris';

const ProductModal = ({ open, onClose, productId, products }) => {
  if (!open || !productId || !products) {
    return null;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return null;
  }

  const { image, title, price, category, description, rate, count } = product;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      primaryAction={{
        content: 'Close',
        onAction: onClose,
      }}
    >
      <Modal.Section>
        <img src={image} alt={title} style={{ width:'250px',maxHeight:'200px',position:'relative',left:'170px' }} />
        <TextContainer>
          <p style={{fontWeight:'500',fontSize:'20px'}}><Text strong>Price:</Text> ${price}</p>
          <p style={{fontWeight:'500',height:'50px',marginBottom:'10px',fontSize:'20px'}}><Text strong>Category:</Text> {category}</p>
          <p style={{fontWeight:'500',height:'100px'}}><Text strong>Description:</Text> {description}</p>
          {rate && <p><Text strong>Rating:</Text> {rate}</p>}
          {count && <p><Text strong>Count:</Text> {count}</p>}
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default ProductModal;



// import React from 'react';
// import { Modal } from '@shopify/polaris';

// const ProductModal = ({ open, onClose, productId, products }) => {
//   if (!productId) return null; // Return null if productId is null

//   const product = products.find(p => p.id === productId);

//   if (!product) return null; // Return null if product is not found

//   return (
//     <Modal open={open} onClose={onClose} title={product.title} primaryAction={{ content: 'Close', onAction: onClose }}>
//       <Modal.Section>
//         <img  src={product.image} alt={product.title} style={{ width:'250px',maxHeight:'200px',position:'relative',left:'170px' }} />
//         <p style={{fontWeight:'500',fontSize:'20px'}}>Price:${product.price}</p>
//         <p style={{fontWeight:'500',height:'50px',marginBottom:'10px',fontSize:'20px'}}>Category:{product.category}</p>
//         <p style={{fontSize:'20px',fontWeight:'600'}}>Description</p>
//         <p style={{fontWeight:'500',height:'100px'}}>{product.description}</p>
//         <p style={{fontSize:'20px',fontWeight:'600',height:'30px'}}>Rating</p>
//         <p style={{fontSize:'15px',fontWeight:'400'}}>Rate:{product.rating.rate}</p>
//         <p style={{fontSize:'15px'}}>Count:{product.rating.count}</p>
//       </Modal.Section>
//     </Modal>
//   );
// };

// export default ProductModal; // Exporting ProductModal component as default
