const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "http://31.129.33.168/api/"
      : "http://localhost:8080/api/",
  imageUrl:
    process.env.NODE_ENV === "production" ? "./" : "http://localhost:8080/",
  publicUrl: ".",
};
export default config;
