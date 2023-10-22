import { PanelLeftOpen, User2 } from "lucide-react";
import React from "react";
import { usePrivateApi } from "../../../api";
import { useGetActiveUser } from "../../../service/userService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const Header = ({ MuiDrawer, setMuiDrawer }) => {
  const authApi = usePrivateApi();
  const { data: user, isLoading } = useGetActiveUser();
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <header>
      <div className="flex h-24 w-full items-center justify-between rounded-3xl border border-solid border-secondaryText shadow-2xl">
        <div
          className="flex w-min cursor-pointer items-center gap-4 p-6 "
          onClick={() => setMuiDrawer(!MuiDrawer)}
        >
          <PanelLeftOpen size={22} color="#f65d4e" />
        </div>

        <div className="mr-12 flex items-center gap-8">
          <User2 size={20} />
          <div className="flex flex-col">
            <span className="text-[18px] font-medium capitalize">
              {user.user.userName}
            </span>
            <span className="text-[12px] font-normal capitalize">
              Role : {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
