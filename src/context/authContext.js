import { useRouter } from "next/navigation";
import { createContext, useContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const isClient = typeof window !== "undefined";
const initialState = {
  token: (isClient && Cookies.get("token")) || "",
};

const actions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
};

function authReducer(state, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case actions.LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const login = async (values) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Login successful");
        dispatch({ type: actions.LOGIN_SUCCESS, payload: data.token });
        Cookies.set("token", data.token);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    dispatch({ type: actions.LOGOUT });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token: state.token, login }}>
      {children}
    </AuthContext.Provider>
  );
}
