interface Props {
  children: any;
}

const Mask = (props: Props) => {
  return <div>{props.children}</div>;
};

export default Mask;
