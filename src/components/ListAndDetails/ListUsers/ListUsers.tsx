import React, { useState, useEffect, memo } from "react";
import { DetailAboutUser } from "../DetailAboutUser/DetailAboutUser";
import { User, TUserID } from "../types/types";

const server_ = "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/"


export const ListUsers = memo(() => {
  const [showDetail, setShowDetail] = useState<boolean | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean | undefined>(false)
  const [users, setUsers] = useState([])
  const [numLoad, setNumLoad] = useState<number>(3)
  const [userForDetail, setUserForDetail] = useState<User> ({})
  const [userID, setUserID] = useState<TUserID>(null)

  useEffect(()=>{    
  const getUsers = async(userID: TUserID)=>{
    let server;
    userID? server = `${server_}${userID}.json` : server = `${server_}users.json`;   
    let method = "GET";
    setLoading(true)
    const response = await fetch(server, {
      method,
    }).then((response_) => {
      setLoading(false)
      try {
        return response_.json() ;
      } catch (error) {
        console.log("не удалось проавильно обработать данные ", error)
      }
    }
    ).catch((error)=>{
      console.log('При получении данных произошла ошибка :( ',error)
    })

    if(!userID){
      setUsers(response)
    } else setUserForDetail(response)
  
    console.log("Данные удалось получить ", response)
  }
    getUsers(userID);
  }, [userID])

  const hedlerClickLoadMore = ()=>{
    setNumLoad(users.length)
  }

  const hendlerClickUser = (e:React.MouseEvent)=>{
    const activeNow = document.querySelector(".active")
    const element = e.target as HTMLElement;
    const id = element.getAttribute("id")

    element.classList.add('active')
    activeNow?.classList.remove('active')

    setUserID(id)
    setShowDetail(true)
  }


  return (
    <div className="container">
    <ul className="users-list">

      {users.map((user:User, index)=>{

        {if (index < numLoad) {
          return (
          <li key={user.id} id = {String(user.id)} className="user-item" onClick={hendlerClickUser}>
            {user.name}
          </li>
          )} else if(index === numLoad){
              return (
              <li key={user.id} className="user-item load-more" onClick={hedlerClickLoadMore}>
                ...
              </li>
            )
          }
        }

      })}
    </ul>
    {isLoading && <p>Loading...</p>}
    {showDetail && !isLoading &&<DetailAboutUser user = {userForDetail} showDetail = {showDetail} />}
    </div>
  )
})
