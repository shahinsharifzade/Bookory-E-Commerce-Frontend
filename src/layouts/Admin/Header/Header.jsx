import { PanelLeftOpen } from "lucide-react";
import React from "react";

const Header = ({ MuiDrawer, setMuiDrawer }) => {
  return (
    <header>
      <div className="h-24 w-full rounded-3xl border border-solid border-secondaryText shadow-2xl">
        <div
          className="flex cursor-pointer items-center gap-4 p-6 "
          onClick={() => setMuiDrawer(!MuiDrawer)}
        >
          <PanelLeftOpen size={22} color="#f65d4e" />
        </div>
      </div>
    </header>
  );
};

export default Header;
