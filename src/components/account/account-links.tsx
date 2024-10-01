import React from "react";
import cl from "./account-links.module.css";
import { AccountLinkObject } from "../../pages/account/profile";

interface AccountsLinksProps {
  accLinks: AccountLinkObject[];
}

const AccountLinks: React.FC<AccountsLinksProps> = ({ accLinks }) => {
  return (
    <div className={cl.links_wrapper}>
      <div className={cl.link}>
        {accLinks.map((link) => (
          <p
            key={link.title}
            className={`text text_type_main-medium ${cl.links__main_item} ${
              !link.active ? "text_color_inactive" : ""
            }`}
            onClick={link.onClick}
          >
            {link.title}
          </p>
        ))}
      </div>

      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default AccountLinks;
