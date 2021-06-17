import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import MaskedInput, { maskArray } from "react-text-mask";

interface InputMaskedProps {
  name: string;
  control: Control<any>;
  errors: FieldError | undefined;
  mask: maskArray;
  defaultValue: any;
  placeholder: string;
}

const InputMasked = ({
  name,
  control,
  errors,
  mask,
  defaultValue,
  placeholder,
}: InputMaskedProps) => {
  return (
    <div className="flex-col ">
      <Controller
        key={name}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MaskedInput
            className="input w-full"
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value}
            mask={mask}
            guide={false}
            placeholder={placeholder}
          />
        )}
      />
      <div className="flex h-7 items-center justify-start">
        <span className="text-red-500 text-xs">{errors?.message}</span>
      </div>
    </div>
  );
};

export default InputMasked;
