import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../services/user";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  saveTokenToLocalstorage,
  saveUserToLocalstorage,
} from "../../utils/localstorge";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../../features/user/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const result = await login(values);
      dispatch(loginAction({ user: result.data.user }));
      saveTokenToLocalstorage(result.data.accessToken);
      saveUserToLocalstorage(result.data.user);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      Hello Worl
    </div>
  );
};
export default Login;
