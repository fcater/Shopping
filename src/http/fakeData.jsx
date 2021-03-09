import imgs from "../img/imgApi";
import _ from "lodash";

const { hat1, hat2, hat3, hat4, hat5, hat6 } = imgs.hat;
const { clothe1, clothe2, clothe3, clothe4, clothe5, clothe6 } = imgs.clothe;
const { pants1, pants2, pants3, pants4, pants5, pants6 } = imgs.pants;
const { shoe1, shoe2, shoe3, shoe4, shoe5, shoe6 } = imgs.shoe;
const { tool1, tool2, tool3, tool4, tool5, tool6 } = imgs.tool;

const hat = [
  {
    _id: "hat_1",
    name: "品牌名1",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(_.random(0, 50), 80),
    img: hat1,
  },
  {
    _id: "hat_2",
    name: "品牌名2",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: hat2,
  },
  {
    _id: "hat_3",
    name: "品牌名3",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: hat3,
  },
  {
    _id: "hat_4",
    name: "品牌名4",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: hat4,
  },
  {
    _id: "hat_5",
    name: "品牌名5",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: hat5,
  },
  {
    _id: "hat_6",
    name: "品牌名6",
    type: "hat",
    describe: "帽子通用模板描述用文字，用来描述帽子。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: hat6,
  },
];
const clothe = [
  {
    _id: "clothe_1",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe1,
  },
  {
    _id: "clothe_2",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe2,
  },
  {
    _id: "clothe_3",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe3,
  },
  {
    _id: "clothe_4",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe4,
  },
  {
    _id: "clothe_5",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe5,
  },
  {
    _id: "clothe_6",
    name: "品牌名",
    type: "clothe",
    describe: "上衣通用模板描述用文字，用来描述上衣。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: clothe6,
  },
];
const pants = [
  {
    _id: "pants_1",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants1,
  },
  {
    _id: "pants_2",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants2,
  },
  {
    _id: "pants_3",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants3,
  },
  {
    _id: "pants_4",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants4,
  },
  {
    _id: "pants_5",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants5,
  },
  {
    _id: "pants_6",
    name: "品牌名",
    type: "pants",
    describe: "下装通用模板描述用文字，用来描述下装。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: pants6,
  },
];
const shoe = [
  {
    _id: "shoe_1",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe1,
  },
  {
    _id: "shoe_2",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe2,
  },
  {
    _id: "shoe_3",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe3,
  },
  {
    _id: "shoe_4",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe4,
  },
  {
    _id: "shoe_5",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe5,
  },
  {
    _id: "shoe_6",
    name: "品牌名",
    type: "shoe",
    describe: "鞋类通用模板描述用文字，用来描述鞋。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: shoe6,
  },
];
const tool = [
  {
    _id: "tool_1",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool1,
  },
  {
    _id: "tool_2",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool2,
  },
  {
    _id: "tool_3",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool3,
  },
  {
    _id: "tool_4",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool4,
  },
  {
    _id: "tool_5",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool5,
  },
  {
    _id: "tool_6",
    name: "品牌名",
    type: "tool",
    describe: "工具通用模板描述用文字，用来描述工具。",
    stock: _.random(5000),
    price: Math.round(_.random(10.1, 500.1) * 10) / 10,
    sales: _.random(10000),
    discount: _.random(0, 50),
    img: tool6,
  },
];

const fakeData = [...hat, ...clothe, ...pants, ...shoe, ...tool];
export default fakeData;