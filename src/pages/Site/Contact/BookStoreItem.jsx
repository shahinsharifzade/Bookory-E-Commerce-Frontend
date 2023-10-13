import React from "react";

const BookStoreItem = () => {
  return (
    <div className="w-1/3">
      <div>
        <div className="mb-8 w-[400px]">
          <img
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_2.png"
            alt=""
            className="aspect-[2/1] h-full w-full cursor-pointer rounded-[2rem] object-cover"
          />
        </div>

        <div className="mb-8 text-lg font-medium text-secondartTextBold">
          <h2 className="pb-4 text-[20px] font-semibold capitalize text-black">
            New York
          </h2>
          <p>3164 N Delaware Rd Milan, Indiana(IN), 47031</p>
          <p>Hotline: +(84) 2500 888 33</p>
          <p>support@example.com</p>
        </div>

        <div className="text-lg font-medium text-secondartTextBold">
          <h5 className="pb-4 text-[20px] font-semibold capitalize text-black">
            Working Hours
          </h5>
          <p>Open: 8:00AM – Close: 18:00PM</p>
          <p>Saturday – Sunday: Close</p>
        </div>
      </div>
    </div>
  );
};

export default BookStoreItem;
