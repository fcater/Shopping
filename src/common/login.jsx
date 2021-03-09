import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi";
import auth from "../http/authServices";

class Login extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schemaObj = {
    email: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("邮箱")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(15).required().label("密码"),
  };
  schema = Joi.object(this.schemaObj);

  translate = (errors) => {
    //手动汉化...
    //邮箱
    errors.email === `"邮箱" is not allowed to be empty` &&
      (errors.email = "邮箱不能为空");
    errors.email === `"邮箱" length must be at least 5 characters long` &&
      (errors.email = "邮箱至少大于5个字符");
    errors.email === `"邮箱" must be a valid email` &&
      (errors.email = "请输入正确的邮箱");
    errors.email ===
      `"邮箱" length must be less than or equal to 30 characters long` &&
      (errors.email = "邮箱必须小于或等于30个字符");
    //密码
    errors.password === `"密码" is not allowed to be empty` &&
      (errors.password = "密码不能为空");
    errors.password === `"密码" length must be at least 6 characters long` &&
      (errors.password = "密码至少大于6个字符");
    errors.password ===
      `"密码" length must be less than or equal to 15 characters long` &&
      (errors.password = "密码必须小于等于15个字符");
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
    this.setState({ data, errors });
  };

  handleSubmit = async () => {
    const { data } = this.state;
    try {
      await auth.login(data.email, data.password);
      window.location = "/";
      //登陆必须要重载读取本地用户
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.warning = ex.response.data;
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
    if (auth.getCurrentUserOffLine()) return <Redirect to="/" />;

    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="container bg-dark text-white w-100 mb-5 p-0 rounded d-flex flex-column justify-content-center login">
          <h1 className="text-center pt-3">登陆</h1>
          <form onSubmit={this.handleSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                我只是好看
              </label>
              {errors.warning && (
                <p className="text-danger">{errors.warning}</p>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-dark">彩蛋</div>
              <Link to="/register">没有账号？点击注册!</Link>
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handleSubmit}
                disabled={this.validata()}
              >
                提交
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
