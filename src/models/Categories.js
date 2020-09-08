class Product {
  constructor(
    id,
    cat_status,
    cat_name,
    create_date,
    cat_url,
    category_banner,
    parent_id,
  ) {
    this.id = id;
    this.cat_status = cat_status;
    this.create_date = create_date;
    this.cat_name = cat_name;
    this.cat_url = cat_url;
    this.category_banner = category_banner;
    this.parent_id = parent_id;
  }
}

export default Product;
