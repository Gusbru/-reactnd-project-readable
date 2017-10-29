export const formatDate = (milliseconds) => {
  const dataFormated = new Date(milliseconds);
  const day = dataFormated.getDate();
  const month = dataFormated.getMonth()+1;
  const year = dataFormated.getFullYear();
  const hour = dataFormated.getHours();
  const minutes = dataFormated.getMinutes();
  const seconds = dataFormated.getSeconds();
  return(
    `${day}/${month}/${year} at ${hour}:${minutes}:${seconds}`
  )
}