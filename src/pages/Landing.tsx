import Uploader from "@/components/Uploader";

function Landing() {
  return (
    <main className="max-w-[800px] mx-auto relative">
      <div className="flex gap-4 items-center justify-center select-none">
        <img src="/logo.svg" alt="logo" className="h-24 w-24" />
        <h2 className="text-4xl font-bold uppercase">Squash</h2>
      </div>
      <Uploader />
      <section className="mt-16 flex flex-col gap-8">
        <div>
          <h1 className="text-lg font-semibold text-primary">
            What is Squash?
          </h1>
          <p className="text-lg">
            Squash is a image optimization tool allows you to compress and
            covert images in your browser.
          </p>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-primary">Features:</h1>
          <ul>
            <li>
              Up-to-date encoders, using encoders provided by{" "}
              <a
                href="https://github.com/GoogleChromeLabs/squoosh"
                className="underline"
              >
                Squoosh
              </a>
            </li>
            <li>Secure and private, all your data stays in your browser</li>
            <li>Forget about files sizes and limit, no size limit forever</li>
            <li>
              Batch optimization, drag multiple images and click Optimize All
              and all done
            </li>
            <li>No Installation required</li>
            <li>Do not collect a five-page long "basic visitor data"</li>
            <li>Localization (upcoming)</li>
          </ul>
        </div>
      </section>
      <footer className="fixed bottom-0 flex justify-start py-4 gap-4 bg-base-100">
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

export default Landing;
