class Product {
  constructor(
    product_id,
    product_cat_id,
    product_name,
    product_actual_img,
    product_price,
  ) {
    this.product_id = product_id;
    this.product_cat_id = product_cat_id;
    this.product_actual_img = product_actual_img;
    this.product_name = product_name;

    this.product_price = product_price;
  }
}

export default Product;
