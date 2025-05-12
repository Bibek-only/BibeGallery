
const About = () => {
  return (
    <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">About BiBe Gallery</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A simple yet powerful platform for photographers and visual artists
            to showcase their work and connect with others.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-100 p-4">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Easy Uploads</h3>
            <p className="text-muted-foreground">
              Quickly upload your images with tags and visibility settings to
              organize your collection.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-100 p-4">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Privacy Controls</h3>
            <p className="text-muted-foreground">
              Choose which images are public and which remain private for your
              eyes only.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-100 p-4">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Beautiful Gallery</h3>
            <p className="text-muted-foreground">
              Showcase your work in a responsive, Pinterest-inspired grid layout
              that adapts to any screen.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-100 p-4">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">User Profiles</h3>
            <p className="text-muted-foreground">
              Discover other photographers and browse their public collections
              for inspiration.
            </p>
          </div>
        </div>
      </section>
  )
}

export default About
