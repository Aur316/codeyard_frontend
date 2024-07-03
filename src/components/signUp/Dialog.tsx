import { useState } from "react";
import text from "../../text/text.json";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";

export default function Dialog() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    setEmail("");
    setPassword("");
    try {
      const response = await axios.post(
        "https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate",
        {
          data: { email, password },
        }
      );
      console.log("API Response: ", response.data);
      if (response.data && response.data.result) {
        if (response.data.result.error) {
          setMessage(`Login failed: ${response.data.result.error}`);
        } else {
          setMessage(`Welcome, ${response.data.result.name}`);
        }
      } else {
        setMessage("Login failed: Invalid response structure");
      }
    } catch (error: unknown) {
      console.error("API Error: ", error);

      if (axios.isAxiosError(error)) {
        setMessage(
          "Login failed: " + (error.response?.data?.message || error.message)
        );
      } else if (error instanceof Error) {
        setMessage("Login failed: " + error.message);
      } else {
        setMessage("Login failed: An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog d-flex flex-column w-50 bg-white mx-auto p-4">
      <h1 className="openSansFont fs-1 lh-1 text-secondary fw-semibold">
        {text.welcome}
      </h1>
      <h6 className="openSansFont fs-6 lh-base text-light fw-semibold">
        {text.create}
      </h6>
      <Input placeholder={text.email} value={email} setValue={setEmail} />
      <Input
        placeholder={text.password}
        value={password}
        setValue={setPassword}
        isPass={true}
      />
      <span className="appelFont fs-6 lh-base text-light fw-semibold d-flex align-items-center">
        <span className=" circle bg-primary rounded-circle me-2" />
        {text.remember}
      </span>
      <Button
        value={text.signup}
        style="ms-auto btn-primary"
        onClick={login}
        loading={loading}
      />
      <p className="appleFont fs-6 lh-1 text-secondary">{message}</p>
    </div>
  );
}
