import React from "react";
import { Link } from "react-router-dom";
import { RegLinksInfo } from "@/utils/reg-links-data";

interface FormLinksProps {
  links: RegLinksInfo[];
}

const FormLinks: React.FC<FormLinksProps> = ({ links }) => {
  return (
    <div className="form__links">
      {links.map((link) => (
        <p
          key={link.text}
          className="text text_type_main-default text_color_inactive form__links-text"
        >
          {link.text}
          <Link className="form__link-accent" to={link.to}>
            {link.textAccent}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default FormLinks;
