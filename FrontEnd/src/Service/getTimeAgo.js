function getTimeAgo(date) {
  //this one tells me how long ago
  // const currentDate = new Date();
  // const messageDate = new Date(date);
  // const timeDifference = currentDate.getTime() - messageDate.getTime();
  // const seconds = Math.floor(timeDifference / 1000);
  // const minutes = Math.floor(seconds / 60);
  // const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 24);
  // if (days > 0) {
  //   return `${days} day${days !== 1 ? "s" : ""} ago`;
  // } else if (hours > 0) {
  //   return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  // } else if (minutes > 0) {
  //   return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  // } else {
  //   return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  // }

  //This one returns the day formatted:
  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // };
  // return new Date(date).toLocaleString("en-US", options);

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
