const formatDate =(dateInput : any)=>{
    const date = new Date(dateInput);
    if(!dateInput){
        return null;
    }
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  const formatDateTime = (dateInput: string): string | null => {
  if (!dateInput) return null;

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;

  const day = date.getDate();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[date.getDay()];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};



export {formatDate, formatDateTime}