import { Alert } from "antd";
import React from "react";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = "Uh oh! Something went wrong :(",
  description = "Looks like something went wrong.  Please check your connection and try again.",
}: Props) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
