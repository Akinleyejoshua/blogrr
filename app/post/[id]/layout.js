
import StoreProvider from "@/redux/StoreProvider";
import { getPostAPI } from "@/services/post";

export async function generateMetadata({params}) {
    const id = params.id;
  const data = await getPostAPI({ id });

    return {
      title: "Blogrr Social App",
      image: "https://blogrpro.vercel.app/favicon.ico",
      openGraph: {
        description: data.data.content,
        title: data.data.title,
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
