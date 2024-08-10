import Uploader from "@/components/landing-page/Uploader";
import "./style.css";
import {
  PiCookie,
  PiGearSix,
  PiGitBranch,
  PiImages,
  PiLockKey,
  PiTranslate,
} from "react-icons/pi";

function Landing() {
  return (
    <main className="max-w-[800px] mx-auto relative">
      <section className="flex flex-col h-[80vh] min-h-[600px] justify-around items-center">
        <div className="bg-gradient-to-br from-primary to-accent py-2 bg-clip-text">
          <h2 className="text-4xl text-center font-bold text-transparent">
            Effortlessly resize and optimize multiple images
          </h2>
        </div>
        <Uploader />
      </section>
      <StepSection />
      <FeatureSection />
      <footer className="flex justify-start py-4 gap-4 bg-base-100">
        <a
          href="https://github.com/angus6b23/squash"
          target="_blank"
          className="underline"
        >
          Source Code
        </a>
        <a
          href="https://www.gnu.org/licenses/agpl-3.0.html"
          target="_blank"
          className="underline"
        >
          Licenses
        </a>
        <a
          href="https://liberapay.com/12a.app/"
          target="_blank"
          className="underline"
        >
          Support this project
        </a>
      </footer>
    </main>
  );
}

const StepSection = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="flex flex-col gap-12 items-center min-h-[480px] h-screen justify-center">
      <h1 className="text-2xl font-semibold text-base-content text-center">
        3 Easy Steps
      </h1>
      <div className="border-t-2 border-primary w-24 bg-primary"></div>
      <p className="text-base-content font-light text-center w-[480px]">
        Squash is a image optimization tool allows you to compress and covert
        multiples images in your browser.
      </p>
      <div className="grid grid-cols-3 w-full">
        <div className="border-2 border-neutral flex flex-col px-4 py-8 gap-4 items-center">
          <FileSvg />
          <p className="text-md text-center">
            Select the images you want to modify or optimise
          </p>
        </div>
        <div className="border-t-2 border-b-2 border-neutral flex flex-col gap-4 px-4 py-8 items-center">
          <OptionSvg />
          <p className="text-md text-center">
            Select the desired settings, including resize, rotate and output
            formats and paramenters
          </p>
        </div>
        <div className="border-2 border-neutral flex flex-col gap-4 px-4 py-8 items-center">
          <ClickSvg />
          <p className="text-md text-center">
            Click Optimize All and your images will be ready in a zip file
          </p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={scrollTop}>
        Try Now
      </button>
    </section>
  );
};

const FeatureSection = () => {
  return (
    <section className="flex flex-col gap-12 items-center py-16 justify-start">
      <h1 className="text-2xl font-semibold text-base-content text-center">
        Features
      </h1>
      <div className="border-t-2 border-primary w-24 bg-primary"></div>
      <div className="grid grid-cols-3 gap-y-16 w-full">
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiGearSix className="w-14 h-14" />
          <p>Up-to-date Encoder</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiLockKey className="w-14 h-14" />
          <p>Secure and Privacy</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiImages className="w-14 h-14" />
          <p>Single and Bulk optimization</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiCookie className="w-14 h-14" />
          <p>No Trackers / ads</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiGitBranch className="w-14 h-14" />
          <p>Open Source</p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <PiTranslate className="w-14 h-14" />
          <p>Internationalization (Coming soon)</p>
        </div>
      </div>
    </section>
  );
};

const FileSvg = () => {
  return (
    <svg
      className="w-24 h-24"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <title>folder_type_images_opened</title>
      <path
        d="M27.4,5.5H18.2L16.1,9.7H4.3V26.5H29.5V5.5Zm0,18.7H6.6V11.8H27.4Zm0-14.5H19.2l1-2.1h7.1V9.7Z"
        className="primary"
      />
      <polygon
        points="25.7 13.7 0.5 13.7 4.3 26.5 29.5 26.5 25.7 13.7"
        className="primary"
      />
      <path
        d="M31,15.778Q31,23.39,31,31H10q0-7.612,0-15.223H31"
        className="secondary"
      />
      <path
        d="M26.674,17.8a1.653,1.653,0,1,0,.845.467,1.659,1.659,0,0,0-.845-.467"
        className="primary-content"
      />
      <path
        d="M22.083,26.467,18,20.786l-6.062,8.428h8.174q.987-1.374,1.976-2.747"
        className="primary-content"
      />
      <path
        d="M25.043,23.391q-2.095,2.912-4.188,5.824h8.377Q27.138,26.3,25.043,23.391Z"
        className="primary-content"
      />
    </svg>
  );
};

const OptionSvg = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-24 h-24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          opacity="0.4"
          d="M18.5094 1.7998C18.0094 1.7998 17.6094 2.1998 17.6094 2.6998V7.3498C17.6094 7.8498 18.0094 8.2498 18.5094 8.2498C19.0094 8.2498 19.4094 7.8498 19.4094 7.3498V2.6998C19.4094 2.1998 19.0094 1.7998 18.5094 1.7998Z"
          className="primary"
        ></path>{" "}
        <path
          d="M11.9996 15.75C11.4996 15.75 11.0996 16.15 11.0996 16.65V21.3C11.0996 21.8 11.4996 22.2 11.9996 22.2C12.4996 22.2 12.8996 21.8 12.8996 21.3V16.65C12.8996 16.16 12.4996 15.75 11.9996 15.75Z"
          className="primary"
        ></path>{" "}
        <path
          opacity="0.4"
          d="M5.48984 1.7998C4.98984 1.7998 4.58984 2.1998 4.58984 2.6998V7.3498C4.58984 7.8498 4.98984 8.2498 5.48984 8.2498C5.98984 8.2498 6.38984 7.8498 6.38984 7.3498V2.6998C6.38984 2.1998 5.97984 1.7998 5.48984 1.7998Z"
          className="secondary"
        ></path>{" "}
        <path
          opacity="0.4"
          d="M7.35047 10.1699H3.63047C3.13047 10.1699 2.73047 10.5699 2.73047 11.0699C2.73047 11.5699 3.13047 11.9699 3.63047 11.9699H4.59047V21.2999C4.59047 21.7999 4.99047 22.1999 5.49047 22.1999C5.99047 22.1999 6.39047 21.7999 6.39047 21.2999V11.9699H7.35047C7.85047 11.9699 8.25047 11.5699 8.25047 11.0699C8.25047 10.5699 7.84047 10.1699 7.35047 10.1699Z"
          className="secondary"
        ></path>{" "}
        <path
          opacity="0.4"
          d="M20.37 10.1699H16.65C16.15 10.1699 15.75 10.5699 15.75 11.0699C15.75 11.5699 16.15 11.9699 16.65 11.9699H17.61V21.2999C17.61 21.7999 18.01 22.1999 18.51 22.1999C19.01 22.1999 19.41 21.7999 19.41 21.2999V11.9699H20.37C20.87 11.9699 21.27 11.5699 21.27 11.0699C21.27 10.5699 20.87 10.1699 20.37 10.1699Z"
          className="primary"
        ></path>{" "}
        <path
          d="M13.8602 12.0298H12.9002V2.6998C12.9002 2.1998 12.5002 1.7998 12.0002 1.7998C11.5002 1.7998 11.1002 2.1998 11.1002 2.6998V12.0298H10.1402C9.64023 12.0298 9.24023 12.4298 9.24023 12.9298C9.24023 13.4298 9.64023 13.8298 10.1402 13.8298H13.8602C14.3602 13.8298 14.7602 13.4298 14.7602 12.9298C14.7602 12.4298 14.3602 12.0298 13.8602 12.0298Z"
          className="primary"
        ></path>{" "}
      </g>
    </svg>
  );
};

const ClickSvg = () => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-24"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>{" "}
        <path
          d="M24 4V12"
          className="primary"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 22L42 26L36 30L42 36L36 42L30 36L26 42L22 22Z"
          fill="oklch(var(--pc))"
          stroke="oklch(var(--s))"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          d="M38.1421 9.85795L32.4853 15.5148"
          className="primary"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          d="M9.85787 38.1421L15.5147 32.4852"
          className="primary"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          d="M4 24H12"
          className="primary"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          d="M9.85783 9.85787L15.5147 15.5147"
          className="primary"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Landing;
