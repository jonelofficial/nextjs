import classes from "./error-alert.module.css";

const ErrorAlert = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
