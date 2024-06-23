
export type TDetails = {
  city?: string,
  company?: string,
  position?: string,
}

export type User =  {
  avatar?: string,
  details?: TDetails
  id?: number|string,
  name?: string,
}

export type TUser =  {
  user: User
  showDetail: boolean | undefined
}

export type TUserID = number | string | null