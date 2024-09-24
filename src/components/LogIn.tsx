import text from "../text/text.json";
import Button from "./ui/Button";
import { useTranslation } from "react-i18next";

export default function LogIn() {
  const { t } = useTranslation();
  return (
    <div
      className={`d-flex flex-column col-12 col-md-6`}
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <div className="background" />
      <div className="content d-flex flex-column align-items-top justify-content-center h-100 p-5 ">
        <img
          src="/acme@3x.png"
          alt="Acme logo"
          className="align-self-start img-fluid"
        />
        <h1 className="openSansFont fw-semibold fs-1 lh-base text-white mt-5">
          {t("already")}
        </h1>
        <p className="appleFont fs-6 lh-1 text-white">{t("awesome")}</p>
        <p className="appleFont fs-6 lh-1 text-white">{t("skip")}</p>
        <Button
          value={t("login")}
          style="align-self-start border border-white"
        />
      </div>
    </div>
  );
}
