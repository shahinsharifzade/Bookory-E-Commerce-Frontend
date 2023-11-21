import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { UserCircle2 } from "lucide-react";
import ReviewForm from "./ReviewForm";
import Rating from "../../../components/ui/Rating/Rating";
import { api } from "../../../api";

const fetchReview = async (Id) => {
  const response = await api.get(`Comment/get/${Id}/book`);

  return response.data;
};

const fetchUser = async (userId) => {
  const response = await api.get(`Users/${userId}`);

  return response.data;
};

const BookReviews = ({ id }) => {
  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReview(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const fetchUserForReview = async (userId) => {
    const userData = await fetchUser(userId);

    return userData;
  };

  const getUserDataForReviews = async () => {
    const userDataPromises = reviewsData.map((review) =>
      fetchUserForReview(review.userId),
    );

    const userData = await Promise.all(userDataPromises);
    return userData;
  };

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["reviewuser"],
    queryFn: getUserDataForReviews,
    enabled: !!reviewsData,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  console.log(
    "🚀 ~ file: BookReviews.jsx:67 ~ BookReviews ~ userData:",
    userData,
  );

  if (isLoading || isLoadingUser || !reviewsData || !userData)
    return (
      <LoadingSpinner
        isLoading={isLoading || isLoadingUser || !reviewsData || !userData}
      />
    );

  return (
    <>
      <div className="mx-auto max-w-[85rem] ">
        {reviewsData.map((review, index) => (
          <div key={review.id} className="mb-16 flex gap-4">
            <div>
              <UserCircle2 color="#999999" size={"60px"} strokeWidth={1} />
            </div>
            <div>
              <p className="mb-4 pt-2 capitalize">
                {userData[index]?.user?.userName}
              </p>
              <div className="mb-4">
                <Rating rating={review.rating} />
              </div>
              <p className="text-xl font-light text-secondartTextBold">
                {review.content}
              </p>
            </div>
          </div>
        ))}
        <div>
          <ReviewForm bookId={id} />
        </div>
      </div>
    </>
  );
};

export default BookReviews;
