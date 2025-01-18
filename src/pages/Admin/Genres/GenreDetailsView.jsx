import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { useGetGenreById } from "../../../service/genreService";

const GenreDetailsView = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const { data: genre, isError, isLoading, error } = useGetGenreById(genreId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Name " value={genre.name} />
      <InfoDisplay label="Id" value={genre.id} />

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <p>Books</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-8">
            {genre.books.map((book, index) => {
              return (
                <div>
                  <div
                    className="w-[200px] shrink-0 rounded-[1rem]"
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
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

export default GenreDetailsView;
