import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  name: string;
  errors: FieldError | undefined;
  register: any;
  isPassword?: boolean;
  placeholder: string;
}

const Input = ({
  name,
  errors,
  register,
  isPassword = false,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex-col">
      <input
        type={isPassword ? "password" : "text"}
        className="input w-full"
        placeholder={placeholder}
        {...register(name)}
      />
      <div className="flex h-7 items-center justify-start">
        <span className="text-red-500 text-xs">{errors?.message}</span>
      </div>
    </div>
  );
};

export default Input;
