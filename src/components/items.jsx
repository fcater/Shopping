import React, { Component } from "react";
import { getCurrentUserOffLine } from "./../http/authServices";
import itemService from "../http/itemService";
import Joi from "joi";

class Register extends Component {
  state = {
    data: {},
    errors: {},
  };

  componentDidMount() {
    const { data } = this.state;
    const user = getCurrentUserOffLine();
    if (user) {
      //自动读取上传用户id
      data["owner"] = user._id;
      //设置默认类型为帽子
      data["type"] = "hat";
      this.setState({ data });
    }
  }

  schemaObj = {
    owner: Joi.string().trim().min(0).max(50).required(),
    name: Joi.string().trim().min(3).max(10).required().label("商品名"),
    type: Joi.string().trim().min(3).max(10).required().label("类型"),
    describe: Joi.string().min(3).max(255).required().label("描述"),
    stock: Joi.number().min(0).max(1000).required().label("库存"),
    price: Joi.number().min(0).max(100000).required().label("价格"),
    discount: Joi.number().min(0).max(90).label("折扣"),
    img: Joi.string().trim().min(3).required().label("图片"),
  };
  schema = Joi.object(this.schemaObj);

  translate = (errors) => {
    //手动汉化...
    //商品名
    errors &&
      errors.name === `"商品名" is not allowed to be empty` &&
      (errors.name = "商品名不能为空");
    errors &&
      errors.name === `"商品名" length must be at least 3 characters long` &&
      (errors.name = "商品名至少大于3字符");
    errors &&
      errors.name ===
        `"商品名" length must be less than or equal to 10 characters long` &&
      (errors.name = "商品名必须小于或等于10字符");
    //类型
    errors.type === `"类型" is not allowed to be empty` &&
      (errors.type = "类型不能为空");
    errors.type === `"类型" length must be at least 3 characters long` &&
      (errors.type = "类型至少大于3个字符");
    errors.type ===
      `"类型" length must be less than or equal to 10 characters long` &&
      (errors.type = "类型必须小于或等于10个字符");
    //描述
    errors.describe === `"描述" is not allowed to be empty` &&
      (errors.describe = "描述不能为空");
    errors.describe === `"描述" length must be at least 3 characters long` &&
      (errors.describe = "描述至少大于3个字符");
    errors.describe ===
      `"描述" length must be less than or equal to 255 characters long` &&
      (errors.describe = "描述必须小于等于255个字符");
    //库存
    errors.stock === `"库存" must be a number` &&
      (errors.stock = "库存必须是数字");
    errors.stock === `"库存" must be greater than or equal to 0` &&
      (errors.stock = "库存不能少于0");
    errors.stock === `"库存" must be less than or equal to 1000` &&
      (errors.stock = "库存不能超过1000");
    //价格
    errors.price === `"价格" must be a number` &&
      (errors.price = "价格必须是数字");
    errors.price === `"价格" must be greater than or equal to 0` &&
      (errors.price = "价格不能少于0");
    errors.price === `"价格" must be less than or equal to 100000` &&
      (errors.price = "价格不能超过100000元");
    //折扣
    errors.discount === `"折扣" must be a number` &&
      (errors.discount = "折扣必须是数字");
    errors.discount === `"折扣" must be greater than or equal to 0` &&
      (errors.discount = "折扣不能少于0");
    errors.discount === `"折扣" must be less than or equal to 90` &&
      (errors.discount = "折扣不能超过90%");

    return errors;
  };

  handleChange = (e) => {
    let { data, errors } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    errors[e.currentTarget.id] = this.validateProperty(
      e.currentTarget.id,
      e.currentTarget.value
    );

    this.translate(errors);
    //手动汉化...
    this.setState({ data, errors });
  };

  handleImg = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("上传图片不能超过1mb");
    }
    if (file) {
      const { data } = this.state;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgcode = e.target.result;
        data.img = imgcode;
      };
      this.setState({ data });
    }
  };

  handleSubmit = () => {
    let { data } = this.state;
    const errors = this.validata();
    this.doSubmit();
    this.setState({ data, errors: errors || {} });
  };

  doSubmit = async () => {
    try {
      await itemService.createItem(this.state.data);
      window.location = "/order";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.type = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  validata = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schemaObj[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="container w-100 m-5 p-0 rounded d-flex flex-column justify-content-center register">
          <h1 className="text-center pt-3">上传商品</h1>
          <form className="p-3">
            <div className="form-group text-left">
              <label htmlFor="name">商品名</label>
              <input
                type="string"
                className="form-control"
                id="name"
                onChange={this.handleChange}
                autoComplete="off"
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
              {errors.name && <p className="text-warning">{errors.name}</p>}
            </div>
            <div className="form-group text-left">
              <label htmlFor="img">图片</label>
              <input
                type="file"
                className="form-control"
                id="img"
                autoComplete="off"
                onChange={this.handleImg}
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              />
              {errors.img && <p className="text-warning">{errors.img}</p>}
            </div>
            <div className="form-group text-left">
              <label htmlFor="type">类型</label>
              <select
                className="custom-select"
                id="type"
                onChange={this.handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              >
                <option defaultValue value="hat">
                  帽子
                </option>
                <option
                  value="clothe"
                  style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                >
                  上衣
                </option>
                <option value="pants">裤子</option>
                <option value="shoe">鞋</option>
                <option value="tool">工具</option>
              </select>
              {errors.type && <p className="text-warning">{errors.type}</p>}
            </div>
            <div className="form-group text-left">
              <label htmlFor="describe">描述</label>
              <input
                type="describe"
                className="form-control text-left"
                id="describe"
                autoComplete="off"
                onChange={this.handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
              {errors.describe && (
                <p className="text-warning">{errors.describe}</p>
              )}
            </div>
            <div className="form-group text-left">
              <label htmlFor="stock">库存</label>
              <input
                type="stock"
                className="form-control text-left"
                id="stock"
                autoComplete="off"
                onChange={this.handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
              {errors.stock && <p className="text-warning">{errors.stock}</p>}
            </div>
            <div className="form-group text-left">
              <div className="d-flex">
                <div>
                  <label htmlFor="price">价格</label>
                  <input
                    type="price"
                    className="form-control text-left"
                    id="price"
                    autoComplete="off"
                    onChange={this.handleChange}
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                  />
                </div>
                <div className="w-25 ml-4">
                  <label htmlFor="discount">折扣</label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      id="discount"
                      autoComplete="off"
                      className="form-control text-left"
                      onChange={this.handleChange}
                      defaultValue="0"
                      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                    />
                    <p style={{ marginLeft: "-20px", color: "black" }}>
                      <b>%</b>
                    </p>
                  </div>
                </div>
              </div>
              {errors.price && <p className="text-warning">{errors.price}</p>}
              {errors.discount && (
                <p className="text-warning">{errors.discount}</p>
              )}
            </div>

            <button
              disabled={this.validata()}
              type="button"
              onClick={this.handleSubmit}
              className="btn btn-success"
            >
              提交
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
