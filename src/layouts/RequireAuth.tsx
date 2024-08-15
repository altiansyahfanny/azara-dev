import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { OctagonX } from "lucide-react";

type RequireAuthProps = {
    allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const location = useLocation();
    const auth = useAuth();

    // console.log('RequireAuth -> auth : ', auth);

    let content;

    if (auth.role) {
        if (allowedRoles.includes(auth.role)) {
            content = <Outlet />;
        } else {
            // when user has been login but deny to visit the page
            if (auth.role === "teacher") {
                content = (
                    <div className="h-[500px] grid place-content-center">
                        <div className="flex flex-col items-center gap-y-4 justify-center">
                            <OctagonX className="block" size={120} />
                            <p className="font-semibold text-2xl uppercase">
                                Akses Ditolak
                            </p>
                        </div>
                    </div>
                );
            } else {
                content = (
                    <Navigate
                        to="/forbidden"
                        state={{ from: location }}
                        replace
                    />
                );
            }
        }
    } else {
        // when not login and try to access page
        content = <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return content;
};
export default RequireAuth;
