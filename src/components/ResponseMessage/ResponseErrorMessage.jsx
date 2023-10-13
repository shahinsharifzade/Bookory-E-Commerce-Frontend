import { XCircle } from "lucide-react";
import React from "react";

const ResponseErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-lg text-red-600">
      <XCircle
        className={`${message === undefined && "hidden"}`}
        size={14}
        color="red"
      />
      {message}
    </div>
  );
};

export default ResponseErrorMessage;
