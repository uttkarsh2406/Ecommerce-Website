import React, { useEffect, useState } from "react";
import { fetchProductByFilter, getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  AntDesignOutlined,
  BgColorsOutlined,CarOutlined,
} from "@ant-design/icons";
import { getSubs } from "../functions/sub";
import { getCategories } from "../functions/category";
import Star from "../components/Forms/Star";
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesID, setCategoriesID] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "white",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
    "Acer",
    "Sony",
    "DELL",
    "HP",
  ]);
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");
  let { search } = useSelector((state) => ({ ...state }));
  let { text } = search;

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => {
      setSubs(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(5).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 1000);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price: price });
  }, [ok]);

  const fetchProducts = (arg) => {
    setLoading(true);

    if (arg.query === "" || arg.query === " ") {
      getProductsByCount(5).then((p) => {
        setProducts(p.data);
        setLoading(false);
      });
    } else {
      fetchProductByFilter(arg)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar("");
    setCategoriesID([]);
    setPrice(value);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 1000);
  };
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setColor("");
    setBrand("");

    let inTheState = [...categoriesID];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoriesID(inTheState);
    fetchProducts({ category: inTheState });
    // console.log(inTheState)
  };
  const showCategories = () => {
    return categories.map((category) => {
      return (
        <div key={category._id}>
          <Checkbox
            onChange={handleCheck}
            className="pb-2 ps-4 pe-4"
            value={category._id}
            name="category"
            checked={categoriesID.includes(category._id)}
          >
            {category.name}
          </Checkbox>
          <br />
        </div>
      );
    });
  };

  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesID([]);
    setStar(num);
    setSub("");
    setColor("");
    setBrand("");
    setShipping("");

    fetchProducts({ stars: num });
  };
  const showStars = () => {
    return (
      <div className="pe-4 ps-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    );
  };

  const handleSubmit = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesID([]);
    setStar("");
    setColor("");
    setBrand("");
    setShipping("");

    fetchProducts({ sub: sub });
  };
  const showSubs = () => {
    return subs.map((sub) => {
      return (
        <div
          className="p-1 m-1 badge bg-secondary h-1"
          key={sub._id}
          name="sub"
          value={sub._id}
          onClick={() => handleSubmit(sub)}
        >
          {sub.name}
        </div>
      );
    });
  };
  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesID([]);
    setStar("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () => {
    return brands.map((mbrand) => {
      return (
        <div>
          <Radio
            value={mbrand}
            name={mbrand}
            checked={mbrand === brand}
            onChange={handleBrand}
            className="pb-1 ps-1 pe-4"
          >
            {mbrand}
          </Radio>
        </div>
      );
    });
  };
  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesID([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");

    fetchProducts({ color: e.target.value });
  };
  const showColors = () => {
    return colors.map((mcolor) => {
      return (
        <div>
          <Radio
            value={mcolor}
            name={mcolor}
            checked={mcolor === color}
            onChange={handleColor}
            className="pb-1 ps-1 pe-4"
          >
            {mcolor}
          </Radio>
        </div>
      );
    });
  };
  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoriesID([]);
    setStar("");
    setBrand("");
    setColor();
    setShipping(e.target.value);
    fetchProducts({shipping: e.target.value})
  };
  const showShipping = () => {
    return (
      <div>
        <Checkbox
          className="pb-2 ps-4 pe-4"
          onChange={handleShippingChange}
          value="Yes"
          checked={shipping === "Yes"}
        >
          Yes
        </Checkbox>
        <Checkbox
          className="pb-2 ps-4 pe-4"
          onChange={handleShippingChange}
          value="No"
          checked={shipping === "No"}
        >
          No
        </Checkbox>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2 position-sticky">
          Search / Filter
          <hr />
          <Menu mode="inline" defaultOpenKeys={["1", "2", "3", "4", "5", "6 "]}>
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined className="h1" />
                  &nbsp;&nbsp; Price
                </span>
              }
            >
              <Slider
                className="mx-3"
                tipFormatter={(v) => `₹${v}`}
                range
                value={price}
                onChange={handleSlider}
                max="500000"
              />
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined className="h1" />
                  &nbsp;&nbsp; Categories
                </span>
              }
            >
              <div s>{showCategories()}</div>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined className="h1" />
                  &nbsp;&nbsp; Rating
                </span>
              }
            >
              <div s>{showStars()}</div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined className="h1" />
                  &nbsp;&nbsp; Sub Category
                </span>
              }
            >
              <div className="ps-4">{showSubs()}</div>
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <AntDesignOutlined className="h1" />
                  &nbsp;&nbsp; Brand
                </span>
              }
            >
              <div className="ps-4">{showBrands()}</div>
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined className="h1" />
                  &nbsp;&nbsp; color
                </span>
              }
            >
              <div className="ps-4">{showColors()}</div>
            </SubMenu>
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <CarOutlined className="h1" />
                  &nbsp;&nbsp; Shipping
                </span>
              }
            >
              <div className="ps-4">{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}

          <div className="row ">
            {products.map((product) => {
              return (
                <div key={product._id} className="col-md-4 mb-4 ">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
