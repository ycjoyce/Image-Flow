interface Props {
  children: any;
}

const Mask = (props: Props) => {
  return <div className="mask">{props.children}</div>;
};

export default Mask;
