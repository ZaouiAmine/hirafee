import Link from "next/link";
import Image from 'next/image';
import paintre from '../homePages/maçon.jpg';
import maçon from '../homePages/paintre.jpg';
import plombier from '../homePages/plombier.jpg';


const NotSignedPage = () => {
  return (
    <main
      id="notSignedInBg"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div className="container p-6">
        <h1 className="text-gray-900 font-extrabold text-5xl sm:text-7xl text-center my-16">
          WELCOME TO<span className="text-green-500"> HIRAFEE</span>
          <br className="hidden sm:block" /> CONNECTING CLIENTS
          <br className="hidden sm:block" /> AND ARTISANS
        </h1>
        <p className="font-thin text-gray-400 text-center">
          Hirafee brings artisans and clients together, revolutionizing the way
          you connect and collaborate.
          <br className="hidden sm:block" /> Whether you're searching for a
          talented artisan for your project or an artisan looking for your next
          gig,
          <br className="hidden sm:block" /> our platform provides the perfect
          solution.
        </p>
      </div>

            <div className="flex justify-center items-center">
        <div className="flex">
          <Image src={paintre} alt="Image 1" width={200} height={200} className="mx-2" />
          <Image src={plombier} alt="Image 2" width={200} height={200} className="mx-2" />
          <Image src={maçon} alt="Image 3" width={200} height={200} className="mx-2" />
          
        </div>
      </div>


      <Link
        href="/auth/signup"
        className="flex items-center gap-2 btn m-6  mb-40 text-center text-white bg-green-500 hover:text-green-500 hover:bg-white py-2 px-4 rounded-md border border-green-500"
      >
        Start now
        {/* <FaArrowAltCircleRight /> */}
      </Link>
    </main>
  );
};
export default NotSignedPage;
