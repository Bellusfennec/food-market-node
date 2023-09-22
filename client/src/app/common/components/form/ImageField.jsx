import React, { useState } from "react";
import style from "./ImageField.module.scss";
import configFile from "../../../../config";

const ImageField = (props) => {
  const { name, value, error, onChange, onBlur, placeholder } = props;
  const [preview, setPreview] = useState({});
  const image = preview?.src ? preview?.src : configFile.imageUrl + value;

  const handler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview({ ...file, name: file.name, src: reader.result });
      };
      onChange(event);
    }
  };

  return (
    <div className={style.grow}>
      <div className={style.container + (error ? " " + style.error : "")}>
        <input
          id={"file-" + name}
          type="file"
          accept="image/*"
          name={name}
          // value={value}
          onChange={handler}
          onBlur={onBlur}
          className={style.input}
        />
        {placeholder && <div className={style.placeholder}>{placeholder}</div>}
        <div className={style.border}></div>
      </div>
      {error && <p className={style.hint}>{error}</p>}
      <div className={style.container + (error ? " " + style.error : "")}>
        <div className={style.image}>
          <img src={image} alt="Preview" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageField);
