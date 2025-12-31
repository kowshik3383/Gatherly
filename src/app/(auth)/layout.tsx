import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "Gatherly",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthLayout;