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

export {formatDate}