import { LayoutProps } from "@types/allTypes";
import React from "react";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-slate-50 w-full min-h-[85vh] h-fit flex items-center justify-center px-4 py-12">
            <div className="bg-white w-full max-w-xl px-6 py-10">{children}</div>
        </div>
    );
};

export default AuthLayout;
