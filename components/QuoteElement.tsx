export const QuoteElement = (props: { attributes: any; children: any }) => {
  return (
    <blockquote className="border-l-4 border-red-400 pl-2 text-lg text-gray-700" {...props.attributes}>
      {props.children}
    </blockquote>
  );
};