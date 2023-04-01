import axios from "axios";

export const createProduct = async (product, authtoken) => {
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProdcutsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,  {
    headers: {
      authtoken,
    },
  });
};