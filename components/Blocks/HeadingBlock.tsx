const HeadingBlock = (props: { attributes: any; children: any; headingSize: 1 | 2 | 3; }) => {
  const headingClass = {
    1: 'text-4xl',
    2: 'text-2xl',
    3: 'text-xl',
  };

  const CustomTag = `h${props.headingSize}`;

  return (
    <CustomTag className={`font-bold ${headingClass[props.headingSize]}`} {...props.attributes}>
      {props.children}
    </CustomTag>
  );
};

export default HeadingBlock;