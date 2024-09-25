export const showStatus = (
  defaultStatus: "sent" | "not_sent" | "in_progress"
) => {
  switch (defaultStatus) {
    case "sent":
      return {
        text: "ارسال شده",
        className: "badge badge-success text-white",
      };
    case "in_progress":
      return {
        text: "در حال ارسال",
        className: "badge badge-info text-white",
      };
    default:
      return {
        text: "ارسال نشده",
        className: "badge badge-error text-white",
      };
  }
};
