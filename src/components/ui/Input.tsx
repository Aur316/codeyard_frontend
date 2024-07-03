import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

interface InputProps {
  placeholder: string;
  value: string;
  setValue: any;
  isPass?: boolean;
}

export default function Input(props: InputProps) {
  const [eye, setEye] = useState<boolean>(true);

  const toggleEye = () => {
    setEye(!eye);
  };

  return (
    <div className="position-relative form-floating d-flex align-items-center mb-3">
      <input
        type={props.isPass && eye ? "password" : "text"}
        className="form-control border-0 border-bottom border-primary rounded-0 fs-6 lh-base text-secondary"
        id={props.isPass ? "floatingPassword" : "floatingEmail"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        style={{
          boxShadow: "none",
          outline: "none",
        }}
      />
      <label htmlFor="floatingInput">{props.placeholder}</label>
      {props.isPass && (
        <div className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center me-0">
          <span
            className="mx-2"
            onClick={toggleEye}
            style={{ cursor: "pointer" }}
          >
            {eye ? <FaEye /> : <FaEyeSlash />}
          </span>
          <PasswordStrengthBar password={props.value} minLength={6} />
        </div>
      )}
    </div>
  );
}
