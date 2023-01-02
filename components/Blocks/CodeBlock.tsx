const CodeBlock = (props: { attributes: any; children: any }) => {
  return (
    <pre className="bg-gray-100 px-4 py-2 rounded-lg">
      <code className="text-gray-500 font-mono text-sm" {...props.attributes}>
        {props.children}
      </code>
    </pre>
  );
};

export default CodeBlock;