import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../utils/axios";

export const AuthContext = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState();
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token === null || token === undefined) {
          setisLoading(false);

          return false;
        }
        const res = await API("/auth/me");

        setisLoading(false);
        setUser(res?.data?.user);
      } catch (err) {
        localStorage.removeItem("token");
        setisLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, isLoading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default Contextprovider;
