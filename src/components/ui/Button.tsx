import Loader from "./Loader";

interface ButtonProps {
  value: string;
  style?: string;
  onClick?: () => void;
  loading?: boolean;
}
export default function Button(props: ButtonProps) {
  return (
    <>
      {props.loading === true ? (
        <Loader />
      ) : (
        <button
          type="button"
          className={`btn btn-lg mt-3 mb-2 text-white openSansFont fs-6 ${props.style}`}
          style={{ width: "100px" }}
          onClick={props.onClick}
        >
          {props.value}
        </button>
      )}
    </>
  );
}
