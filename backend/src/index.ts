import app from "./app";

app.listen(process.env.PORT || 3001, () => {
  console.log({
    msg: "App is sucessfylly run",
    link: `http://localhost:${process.env.PORT || 3001}`,
  });
});
