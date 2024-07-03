import SignUp from "./SignUp";
import LogIn from "./LogIn";

export default function Main() {
  return (
    <div className="container-fluid d-flex flex-wrap p-0">
      <SignUp />
      <LogIn />
    </div>
  );
}
