import moment from "moment";

export const dateFormatter = (dateString: string, formatPattern: string) => {
  const formattedDate = moment.utc(new Date(dateString)).local();
  return formattedDate.format(formatPattern);
};
