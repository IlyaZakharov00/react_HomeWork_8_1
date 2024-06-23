import { memo } from "react";
import { TUser } from "../types/types"

export const DetailAboutUser = memo((props:TUser) => {
  
  const {avatar, name, details, id} = props.user;  
  if(!details) return(null);  
  const {city, company, position} = details;

  return (
    <div className="user-details">
      <div className="user-photo">
        <img src={avatar + "/" + id} alt="user-avatar" className="user-avatar"/>
      </div>
      <div className="user-name">{name}</div>
      <div className="user-city">City: {city}</div>
      <div className="user-company">Company: {company}</div>
      <div className="user-position">Position: {position}</div>
    </div>
  )
})
