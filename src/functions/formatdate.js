const formatDate = (str)=>{
    return (new Date(str).toUTCString()); 
}

export default formatDate;