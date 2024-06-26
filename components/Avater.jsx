import Image from "next/image";
import { useRouter } from "next/navigation";

export const Avater = ({ data, size, fontSize, pad }) => {
  const router = useRouter();
  return (
    <div
      className="avater flex items-center justify-center bolder pointer btn"
      onClick={() => router.push(`/@${data?.username}`)}
      style={{
        padding: pad,
        maxHeight: size,
        minHeight: size,
        maxWidth: size,
        minWidth: size,
        fontSize: fontSize,
      }}
    >
      {(data.img !== "" && data.img !== undefined && data.img !== null)
        ?
        <Image src={data?.img} alt="" height={3} width={3} />
        :
        data?.username?.charAt(0)
      }
    </div>
  );
};
