import placeholder from "../assets/images/no-image-placeholder.webp";

const getImage = (url: string) => {
  if (!url) return placeholder;

  const target = "185.8.174.74:8090";
  return url.replace(target, "localhost:5000");
};

export default getImage;
