
import StoreProvider from "@/redux/StoreProvider";
import { getPostAPI } from "@/services/post";

export async function generateMetadata({params}) {
    const id = params.id;
  const data = await getPostAPI({ id });

    return {
      title: "Blogrr Social App",
      openGraph: {
        description: data.data.content,
        title: data.data.title,
        image: "https://blogrpro.vercel.app/favicon.ico",

      },
    }; 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
