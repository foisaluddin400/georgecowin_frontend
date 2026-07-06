import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { loginSuccess, logout } from "@/redux/features/auth/authSlice";
import { User, UserRole } from "@/types";
import { DEMO_USERS } from "@/config/roles.config";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const loginWithDemoEmail = (email: string): boolean => {
    const demoUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (demoUser) {
      const userData: User = {
        email: demoUser.email,
        role: demoUser.role as UserRole,
        isLoggedIn: true,
      };
      dispatch(loginSuccess(userData));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isLoading,
    isLoggedIn: !!user?.isLoggedIn,
    role: user?.role || null,
    loginWithDemoEmail,
    logout: handleLogout,
  };
}