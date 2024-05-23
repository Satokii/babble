"use client";

import { FC, ReactNode } from "react";
import { toast, Toaster, ToastBar } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid #713200",
            fontSize: "14px",
            padding: "10px 20px",
            textAlign: "center"
          },
        }}
        position="top-center"
        reverseOrder={false}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    className="border border-transparent rounded-none rounded-r-lg flex items-end text-sm font-medium text-red-500 hover:text-red-300 "
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Dismiss
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      {children}
    </>
  );
};

export default Providers;
