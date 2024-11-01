
import StoreProvider from "@/redux/StoreProvider";
import { getPostAPI } from "@/services/post";
import { formatNumber } from "@/utils/helpers";

export async function generateMetadata({params}) {
    const id = params.id;
    const res = await getPostAPI({ id });
    const data = res.data
    return {
      title: "Blogrr Social App",
      openGraph: {
        description: data.content,
        title: `${data.title} by ${data.username} · ${formatNumber(data.views.length)} Views · ${formatNumber(data.likes.length)} Likes · 
        ${formatNumber(data.comments.length)} Comments`,
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
