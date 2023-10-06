import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BookReviews from "./BookReviews";

const BookDetailsDesciption = ({ book }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="my-16">
      <div>
        <TabContext value={value}>
          <div sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              centered
              sx={{
                "& .MuiButtonBase-root": {
                  fontSize: 20,
                  padding: "20px 30px",
                  fontWeight: 600,
                  color: "#999999",
                },
                "& .Mui-selected": {
                  color: "black",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#f65d4e",
                },
              }}
            >
              <Tab label="Desciption" value="1" />
              <Tab label="Review" value="2" />
              <Tab label="Vendor" value="3" />
            </TabList>
          </div>

          <TabPanel
            value="1"
            sx={{ color: "#999999", fontWeight: 400 }}
            className="rounded-3xl border border-solid border-secondaryText"
          >
            <div className="mx-auto my-0 max-w-[85rem] ">
              {book.description}
            </div>
          </TabPanel>

          <TabPanel
            value="2"
            className="rounded-3xl border border-solid border-secondaryText"
          >
            <BookReviews id={book.id} />
          </TabPanel>

          <TabPanel
            value="3"
            className="rounded-3xl border border-solid border-secondaryText"
          >
            <div className="mx-auto max-w-[85rem]">
              {book.company ? (
                <>
                  <div className="mb-4 text-xl font-bold">
                    Store Name :
                    <span className="pl-4 font-light text-secondartTextBold">
                      {book.company.user.userName}
                    </span>
                  </div>
                  <div className="mb-4 text-xl font-bold">
                    Vendor :
                    <span className="pl-4 font-light text-secondartTextBold">
                      {book.company.name}
                    </span>
                  </div>
                  <div className="mb-4 text-xl font-bold">
                    Address :
                    <span className="pl-4 font-light text-secondartTextBold">
                      {book.company.address}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center text-xl font-bold">
                  This book has no associated company information.
                </div>
              )}
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default BookDetailsDesciption;
