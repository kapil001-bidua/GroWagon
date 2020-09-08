export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return {type: DELETE_PRODUCT, pid: productId};
};

export const createProduct = (Home, HomeNumber, street, address) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      Home,
      HomeNumber,
      street,
      address,
    },
  };
};

export const updateProduct = (Home, HomeNumber, street, address) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      Home,
      HomeNumber,
      street,
      address,
    },
  };
};
