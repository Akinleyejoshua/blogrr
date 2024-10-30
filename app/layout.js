import "./globals.css";
import "./style.css";

import StoreProvider from "@/redux/StoreProvider";


export const metadata = {
  title: "Blogrr Social App",
  description: "Create, Edit, Post and Share Content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
