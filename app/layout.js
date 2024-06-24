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
        <link precedence="default" rel="stylesheet" href={"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"}/>
      
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
