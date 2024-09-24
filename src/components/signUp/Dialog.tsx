import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";

export default function Dialog() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { t } = useTranslation();

  const secretKey =
    process.env.REACT_APP_SECRET_KEY || "extra_super_secret_key";

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password");

    if (savedEmail && encryptedPassword) {
      setEmail(savedEmail);
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      setPassword(decryptedPassword);
    }
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate",
        {
          data: { email, password },
        }
      );
      console.log("API Response: ", response.data);

      if (response.data && response.data.result) {
        setMessage(`Welcome, ${response.data.result.name}`);

        if (rememberMe) {
          const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            secretKey
          ).toString();
          localStorage.setItem("email", email);
          localStorage.setItem("password", encryptedPassword);
        }
      } else {
        setMessage("Login failed: Invalid response structure");
      }
    } catch (error: unknown) {
      console.error("API Error: ", error);
      setMessage("Login failed: An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="dialog d-flex flex-column w-50 bg-white mx-auto p-4">
      <h1 className="openSansFont fs-1 lh-1 text-secondary fw-semibold">
        {t("welcome")}
      </h1>
      <h6 className="openSansFont fs-6 lh-base text-light fw-semibold">
        {t("create")}
      </h6>
      <Input placeholder={t("email")} value={email} setValue={setEmail} />
      <Input
        placeholder={t("password")}
        value={password}
        setValue={setPassword}
        isPass={true}
      />
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <span className="appelFont fs-6 lh-base text-light fw-semibold ms-2">
          {t("remember")}
        </span>
      </div>
      <Button
        value={t("signup")}
        style="ms-auto btn-primary"
        onClick={login}
        loading={loading}
      />
      <p className="appleFont fs-6 lh-1 text-secondary">{message}</p>
    </div>
  );
}
