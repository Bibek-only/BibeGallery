import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const Hero = () => {
  
  const { isLogedIn } = useSelector((state: any) => state.authReducer);
  const {publicImages} = useSelector((state:any)=>state.imageReducer)
  const images:any = publicImages?.slice(0,12);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
          {images.map((image:any) => (
            <div
              key={image.id}
              className="aspect-square w-full overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Share Your Visual Story with the World
          </h1>
          <p className="mb-10 text-xl text-muted-foreground">
            Upload, organize, and showcase your images in a beautiful gallery.
            Control who sees what with public and private visibility options.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {isLogedIn ? (
              <Button size="lg" asChild>
                <Link to="/home">Explore Gallery</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/home">Explore Gallery</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
