import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <p>
        Built by:
        <span>
          Erik Raith |{" "}
          <a href="https://github.com/ERaith" target="_blank" rel = "noopener noreferrer">
            @github/ERaith
          </a>
        </span>
        <span>
          Harry Borrelli |{" "}
          <a href="https://github.com/hborrelli1" target="_blank" rel = "noopener noreferrer">
            @github/hborrelli1
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
