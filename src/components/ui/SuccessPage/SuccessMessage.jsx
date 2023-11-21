import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SuccessMessage = ({ message, navigation, navigationTitle }) => {
  const [open, setOpen] = useState(true);
  console.log("🚀 ~ file: SuccessMessage.jsx:7 ~ SuccessMessage ~ open:", open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="container flex h-screen items-center justify-center">
          <div className=" z-10 mt-32  w-fit max-w-[600px] rounded-3xl bg-white">
            <div className="flex-col items-center justify-center px-8 py-10">
              <p className="mx-12 py-12 text-center text-[20px]">{message}</p>

              <div className="w-full">
                <Link to={navigation} className="w-full">
                  <button
                    className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-2xl font-semibold text-white active:scale-95 active:shadow-xl"
                    type="submit"
                    onClick={handleClose}
                  >
                    {navigationTitle}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SuccessMessage;
