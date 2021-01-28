import * as types from "./type";
import { useDispatch } from "react-redux";

const authActions = () => {
  const dispatch = useDispatch();

  const login = (userData) => {
    const { email, password } = userData;
  };

  return {
    login,
  };
};

export default authActions;
