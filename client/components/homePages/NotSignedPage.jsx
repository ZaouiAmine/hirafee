import Link from "next/link";
import Image from "next/image";
import hero from "@/public/heroBg.png";
import dots from "@/public/landingpage/dots.png";

import pics from "@/public/landingpage/steps/pics.png";

import gig1 from "@/public/landingpage/steps/gig1.png";
import gig2 from "@/public/landingpage/steps/gig2.png";
import gig3 from "@/public/landingpage/steps/gig3.png";
import gig4 from "@/public/landingpage/steps/gig4.png";
import applygig from "@/public/landingpage/steps/applygig.png";
import handshake from "@/public/landingpage/steps/handshake.png";

const NotSignedPage = () => {
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("/api/profiles");
  //       const artisanUsers = response.data.filter(
  //         (user) => user.role === "artisan"
  //       );
  //       setUsers(artisanUsers);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  return (
    <main className="flex flex-col justify-start min-h-screen items-center">
      <section className="container flex p-4 py-32 h-272">
        <div className="lg:w-1/2 flex flex-col items-start gap-8 justify-center relative">
          <h1 className="text-6xl font-semibold text-secondary ">
            {" "}
            Where Artisans Unite,
            <br /> Clients Delight!
          </h1>
          <p className="text-gray-500 ">
            Discover, Connect, Create: Connecting Artisans <br /> and Clients
            for Extraordinary Craftsmanship.
          </p>
          <Link
            href="/auth/signup"
            className="py-2 px-4  bg-secondary hover:bg-white text-white border border-secondary hover:text-secondary font-normal rounded-full"
          >
            Start now
          </Link>
          <Image
            alt=""
            src={dots}
            width={"100"}
            className="absolute bottom-0 left-3/4 rotate-45"
          />
          <Image
            alt=""
            src={dots}
            width={"50"}
            className="absolute top-0 left-1/4 rotate-12"
          />
        </div>
        <div className="hidden lg:w-1/2 lg:flex justify-end relative">
          <Image alt="" src={hero} width={"500"} />
          <Image
            alt=""
            src={dots}
            width={"50"}
            className="absolute top-0 left-1/4 rotate-12"
          />
          <Image
            alt=""
            src={dots}
            width={"80"}
            className="absolute bottom-0 left-4/4 "
          />
        </div>
      </section>
      <section className="container my-12 flex flex-col  items-center justify-center flex py-64 py-8 h-128 relative">
        <div className="relative flex flex-col items-center mb-16">
          <h1 className="lg:text-6xl text-3xl font-bold text-secondary">#1</h1>
          <h2 className="lg:text-3xl text-2xl font-bold text-secondary">
            Create an Account
          </h2>
        </div>
        <Image alt="" src={pics} width={"350"} className="lg:w-136" />
      </section>
      <section className="container my-12 flex flex-col items-center justify-center flex p-4  relative mb-16">
        <div className="relative flex flex-col items-center z-10 pb-16">
          <h1 className="lg:text-6xl text-3xl font-bold text-secondary">#2</h1>
          <h2 className="lg:text-3xl text-2xl font-bold text-secondary">
            Post your first gig as a client .
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 ">
          <Image alt="" src={gig1} width={"300"} className=" md:static" />
          <Image alt="" src={gig2} width={"300"} className="md:block hidden " />
          <Image alt="" src={gig3} width={"300"} className="md:block hidden " />
          <Image alt="" src={gig4} width={"300"} className="md:block hidden " />
        </div>
        <div className="relative my-12 flex flex-col items-center z-10 pb-16">
          <h1 className="lg:text-6xl text-3xl font-bold text-secondary">or</h1>
          <h2 className="lg:text-3xl text-2xl font-bold text-secondary">
            Apply to jobs as an Artisan
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 ">
          <Image alt="" src={applygig} width={"500"} />
        </div>

        <div className="relative mt-24 flex flex-col items-center z-10 pb-16">
          <h1 className="lg:text-6xl text-3xl font-bold text-secondary">#3</h1>
          <h2 className="lg:text-3xl text-2xl font-bold text-secondary">
            Match with each others
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 ">
          <Image alt="" src={handshake} width={"500"} className=" " />
        </div>
      </section>
      <section className="container flex p-4 py-16 h-128 bg-accent">
        categories
      </section>
    </main>
  );
};
export default NotSignedPage;
