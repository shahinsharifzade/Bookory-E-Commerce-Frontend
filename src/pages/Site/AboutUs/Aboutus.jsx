import React from "react";
import Title from "../../../components/ui/Title/Title";

const Aboutus = () => {
  return (
    <section>
      <Title
        title={"Abuot Us"}
        mainNav={"HOME"}
        secondaryNav={"aboutus"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="mb-[340px] mt-32 flex flex-col items-center justify-center">
        <div>
          <img
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_01_1.png"
            alt=""
          />
        </div>
        <p className="max-w-[600px] py-8 text-center text-[26px] font-semibold tracking-tighter">
          We are the premier book retailing chain in the Southeastern United
          States with more than 260 Book stores in 32 states.
        </p>
      </div>

      <div className=" bg-[#faf5f3] ">
        <div className="container  items-center justify-center">
          <div className="relative top-[-150px]">
            <img
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_04.jpg"
              alt=""
              className="rounded-2xl"
            />
          </div>

          <h1 className=" py-8 text-center text-[36px] font-semibold">
            Out Story
          </h1>
          <div className="mb-24 flex items-center justify-center gap-8">
            <div className="max-w-[370px]">
              <div className="mb-12 flex flex-col gap-12">
                <p>RETAIL STORES</p>
                <p className="text-lg font-light text-secondartTextBold ">
                  Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
                  fermentum. Aliquam non tincidunt urna. Integer tincidunt nec
                  nisl vitae ullamcorper. Proin sed ultrices erat.
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <p>RETAIL STORES</p>
                <p className="text-lg font-light text-secondartTextBold ">
                  Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
                  fermentum. Aliquam non tincidunt urna. Integer tincidunt nec
                  nisl vitae ullamcorper. Proin sed ultrices erat.
                </p>
              </div>
            </div>

            <div className="flex max-w-[370px] flex-col gap-4">
              <p>E-COMMERCE AND INTERNET SERVICES</p>
              <p className="text-lg font-light text-secondartTextBold ">
                Pellentesque sodales augue eget ultricies ultricies. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Curabitur sagittis ultrices condimentum.
              </p>
              <br />
              <p className="text-lg font-light text-secondartTextBold ">
                Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae
                ullamcorper. Proin sed ultrices erat. Praesent varius ultrices
                massa at faucibus. Aenean dignissim, orci sed faucibus pharetra,
                dui mi dignissim tortor, sit amet condimentum mi ligula sit amet
                augue. Pellentesque vitae eros eget enim mollis placerat.
              </p>
            </div>
          </div>

          <div className="mb-24">
            <div className="flex gap-8">
              <div>
                <img
                  src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_03.png"
                  alt=""
                  className="rounded-3xl"
                />
              </div>
              <div>
                <img
                  src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_02.png"
                  alt=""
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>

          <div className="container mb-36">
            <div className="flex items-start justify-center gap-8 pb-16">
              <div className=" max-w-[370px]">
                “Bookory Are Such Joy ... To Be Cherished, Handled With
                Pleasure, Read And Reread And Handed Down To The Next
                Generation”
              </div>
              <div className="max-w-[370px] text-lg font-light text-secondartTextBold">
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don’t look
                  even slightly believable.
                </p>
                <br />
                <p>
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn’t anything embarrassing hidden in the middle
                  of text. All the Lorem Ipsum generators on the Internet tend
                  to repeat predefined chunks as necessary, making this the
                  first true generator on the Internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="relative mt-[-200px]">
          <img
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_01.png"
            alt=""
          />
        </div>
      </div>
      <div className="my-16"></div>
    </section>
  );
};
export default Aboutus;
