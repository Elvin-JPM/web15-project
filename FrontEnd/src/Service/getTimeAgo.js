function getTimeAgo(date) {
  const messageDate = new Date(date);
  const currentDate = new Date();
  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return "Today at " + messageDate.toLocaleString("en-US", options);
  }
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear()
  ) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return "Yesterday at " + messageDate.toLocaleString("en-US", options);
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return messageDate.toLocaleString("en-US", options);
}

export default getTimeAgo;
