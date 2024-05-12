export const environment = {
  baseUrl: 'http://localhost:1337/',

  // loging
  login: 'api/auth/local',
  register: 'api/auth/local/register',

  //users
  user_details:
    'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
  updateUserMobile: 'api/users/',
  add_user_address: 'api/user-addresses',
  cities: 'api/cities?populate=state',

  //product
  products:
    'api/products?populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',
  // 'api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',
  // 'api/products?pagination[page]=1&pagination[pageSize]=10&populate[product_image][fields][1]=url&populate[category][fields][0]=category_name&filters[category][id]=2'

  single_product: 'api/products/',
  productSearch:
    'api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',
  getCategory: 'api/categories',

  //cart
  addtocart: 'api/carts',
  getCartProduct: 'api/carts?',
  removeUpdateCartItem: 'api/carts/',
  //order
  placeOrder: 'api/orders',
  getSingleOrder: 'api/orders/',
  getOrderDetails: 'api/orders?fields=%2A&populate=%2A&locale=%2A',

  //wishlist
  addTowishlist: 'api/wish-lists',
  getWishList: 'api/wish-lists?populate=product,user_detail',
  removeWishlist: 'api/wish-lists/',
};

//search http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=your_search_data
