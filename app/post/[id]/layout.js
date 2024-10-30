
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
        images: ["https://blogrpro.vercel.app/icon.png"],

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
