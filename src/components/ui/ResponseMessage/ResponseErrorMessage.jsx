import { XCircle } from "lucide-react";
import React from "react";

const ResponseErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-lg font-medium text-red-600">
      {message === undefined || message === "" ? (
        <XCircle size={14} color="red" className="hidden" />
      ) : null}
      {message}
    </div>
  );
};

export default ResponseErrorMessage;
