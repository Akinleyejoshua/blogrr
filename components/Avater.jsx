export const Avater = ({ data, size, fontSize, pad }) => {
  return (
    <div
      className="avater flex items-center justify-center bolder pointer"
      style={{
        padding: pad,
        maxHeight: size,
        minHeight: size,
        maxWidth: size,
        minWidth: size,
        fontSize: fontSize,
      }}
    >
      {data?.username.charAt(0)}
    </div>
  );
};
