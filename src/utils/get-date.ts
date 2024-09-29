export const getDate = (date: string) => {
  return `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(
    date
  ).getFullYear()}`;
};
