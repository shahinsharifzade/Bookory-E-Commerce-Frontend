import React from "react";
import Title from "../../../components/ui/Title/Title";
import { useParams } from "react-router-dom";
import { useGetById } from "../../../service/companyService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import VendorDetailsContent from "./VendorDetailsContent";

const VendorDetails = () => {
  const { storeId } = useParams();
  const { data: store, isLoading } = useGetById(storeId);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  console.log(store);

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
