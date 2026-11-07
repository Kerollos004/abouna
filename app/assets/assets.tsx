


export interface button {
    id: string,
    text:string
}

export const buttons: button[] = [
    {
        id: "today", 
        text:"اليوم"
    },

    {
        id: "all_data", 
        text:"كل المواعيد"
    },

    {
        id: "mass", 
        text:"القداسات "
    },

    {
        id: "confession", 
        text:"الاعترافات"
    },

    {
        id: "missing", 
        text:"الافتقادات"
    },

    {
        id: "meeting", 
        text:"الاجنماعات"
    },

    {
        id: "other", 
        text:"مواعيد اخري"
    },

]
//new user

export interface User {
    id?: string,
    name: string,
    phone: string, 
    email: string,
    password: string,
    image: string 
}

//new appointment
export interface appointment {
    id?: string, 
    type: string,
    owner: string,
    address: string,
    details: string
    date: string,
    time: string,
    custumed: boolean,
    abouna_id?:string,
    customed_Appointment: string,
    created_at:string| Date
}