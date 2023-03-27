import Link from "next/link";

import classes from "./button.module.css";

const Button = ({ children, link, onClick }) => {
  console.log(!link);
  if (!link) {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <Link className={classes.btn} href={link}>
      {children}
    </Link>
  );
};

export default Button;
