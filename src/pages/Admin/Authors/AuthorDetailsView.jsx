import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuthorById } from "../../../service/authorService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";

const AuthorDetailsView = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();

  const {
    data: author,
    isError,
    isLoading,
    error,
  } = useGetAuthorById(authorId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <div className="my-8 flex flex-wrap">
        {author.images.map((image, index) => {
          return (
            <div className="w-[200px] shrink-0 rounded-[1rem]" key={index}>
              <img
                src={`https://localhost:7047/assets/images/authors/${image.image}`}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="Author cover"
              />
            </div>
          );
        })}
      </div>

      <InfoDisplay label="Name " value={author.name} />
      <InfoDisplay label="Id" value={author.id} />

      <Accordion>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <p>Biography</p>
        </AccordionSummary>
        <AccordionDetails>
          <p>{author.biography}</p>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <p>Books</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-8">
            {author.books.map((book, index) => {
              return (
                <div>
                  <div
                    className="w-[200px] shrink-0 rounded-[1rem]"
                    key={index}
                  >
                    <img
                      src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
                      className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                      alt="Author cover"
                    />
                  </div>
                  <p>{book.title}</p>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default AuthorDetailsView;
