import React, { useEffect } from "react";
import Title from "../../../components/ui/Title/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useGetById } from "../../../service/companyService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import VendorDetailsContent from "./VendorDetailsContent";

const VendorDetails = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { data: store, isLoading, isError, error } = useGetById(storeId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <section>
      <div>
        <Title
          title={store.name}
          titleClasses={"block"}
          mainNav={"Home"}
          secondaryNav={"Store"}
          secondaryNavDisplay={"block"}
          lastNav={store.name}
        />

        <VendorDetailsContent storeId={storeId} store={store} />
      </div>
    </section>
  );
};

export default VendorDetails;
