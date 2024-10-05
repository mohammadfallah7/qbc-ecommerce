const getImage = (url: string) => {
  const target = "185.8.174.74:8090";
  return url.replace(target, "localhost:5000");
};

export default getImage;
