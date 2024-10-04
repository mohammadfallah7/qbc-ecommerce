export const getDate = (date: string) => {
  const d = new Date(date);

  return `${new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
  })
    .format(d)
    .substring(0, 4)}/${new Intl.DateTimeFormat("en-US-u-ca-persian", {
    month: "numeric",
  }).format(d)}/${new Intl.DateTimeFormat("en-US-u-ca-persian", {
    day: "numeric",
  }).format(d)}`;
};
