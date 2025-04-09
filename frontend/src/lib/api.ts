// -------------  It's typically used for client-side fetching (e.g., in useEffect, inside components) or for utility functions, and is not the ideal place for ISR or SSR. ------------------

import axios from 'axios';
import { ProductsApiResponse } from "@types/allTypes";
import { toast } from 'sonner';

export async function getProducts(): Promise<ProductsApiResponse> {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images&populate=category`;

  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    return { data: [], meta: { pagination: { start: 1, limit: 8, total: 0 } } }; // Default meta structure
  }
}

export async function getProductsCategories() {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?populate=image`;

  try {
    const res = await fetch(baseUrl, { next: { revalidate: 3600 * 24 * 7 } }); // ISR every week  

    const data = await res.json();
    return data;
  } catch (error) {
    return { data: [] } // Fallback value
  }
}

export async function getProductsStyles() {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-styles`;

  try {
    const res = await axios.get(baseUrl);

    return res.data;
  } catch (error) {
    return { data: [] } // default value
  }
}

export async function getProductsMaterials() {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-materials`;

  try {
    const res = await axios.get(baseUrl);

    return res.data;
  } catch (error) {
    return { data: [] } // default value
  }
}

export async function addToWishlist(id: number) {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const authInfo = await response.json();

    if (authInfo && authInfo.token && authInfo.userId) {
      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlists`;

      const data = {
        data: {
          products: [id],
          users_permissions_user: authInfo.userId,
        },
      };

      const res = await axios.post(baseUrl, data, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`, // Auth token
        },
      });

      return res.data;
    } else {
      toast.error("Please login to add to wishlist")
      return {}
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export async function addToCart(id: number, quantity: number) {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const authInfo = await response.json();

    if (authInfo && authInfo.token && authInfo.userId) {
      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts`;

      const data = {
        data: {
          products: [id],
          quantity: quantity,
          users_permissions_user: authInfo.userId,
        },
      };

      const res = await axios.post(baseUrl, data, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`, // Auth token
        },
      });

      return res.data;
    } else {
      toast.error("Please login to add to cart")
      return {}
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function getTestimonials() {
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews?populate=*`;

  try {
    const res = await axios.get(baseUrl);

    return res.data;
  } catch (error) {
    return { data: [] } // default value
  }
}

export async function getWishlist() {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const data = await response.json();

    if (data && data.token && data.userId) {
      const query = new URLSearchParams({
        'populate[products][populate]': 'images',
        'sort[createdAt]': 'desc',
        [`filters[users_permissions_user][id][$eq]`]: data.userId,
      });

      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlists?${query.toString()}`;

      const res = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${data.token}`, // Auth token
        },
      });

      return res.data;
    } else {
      return {}
    }
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    throw error;
  }
}

export async function getCart() {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const data = await response.json();

    if (data && data.token && data.userId) {
      const query = new URLSearchParams({
        'populate[products][populate]': 'images',
        'sort[createdAt]': 'desc',
        [`filters[users_permissions_user][id][$eq]`]: data.userId,
      });

      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`;

      const res = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${data.token}`, // Auth token
        },
      });

      return res.data;
    } else {
      return {}
    }
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
}

export async function removeWishlist(id: number) {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const authInfo = await response.json();

    if (authInfo && authInfo.token && authInfo.userId) {
      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlists/${id}`;

      const res = await axios.delete(baseUrl, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`, // Auth token
        },
      });

      return { status: 200, message: "Wishlist removed successfully" };
    } else {
      return { status: 401, message: "Please login to remove wishlist" }
    }
  } catch (error) {
    throw error;
  }
}

export async function removeCart(id: number) {
  try {
    const response = await fetch("/api/auth/auth-info", { credentials: "include" });
    const authInfo = await response.json();

    if (authInfo && authInfo.token && authInfo.userId) {
      const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts/${id}`;

      const res = await axios.delete(baseUrl, {
        headers: {
          Authorization: `Bearer ${authInfo.token}`, // Auth token
        },
      });

      return { status: 200, message: "Cart item removed successfully" };
    } else {
      return { status: 401, message: "Please login to remove Cart item" }
    }
  } catch (error) {
    throw error;
  }
}