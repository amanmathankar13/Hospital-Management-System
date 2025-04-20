import { notifications } from "@mantine/notifications"
import { IconCheck, IconX,  } from "@tabler/icons-react"

const successNotification=(message:string)=>{
    notifications.show({
        title: "Success",
        message: message,
        color:'teal',
        icon: <IconCheck/>,
        withCloseButton:true,
        withBorder: true,
        className: "!border-green-500",
        position: 'top-center'
    })
}

const errorNotification=(message:string)=>{
    notifications.show({
        title: "Failed",
        message: message,
        color:'red',
        icon: <IconX/>,
        withCloseButton:true,
        withBorder: true,
        className: "!border-red-500",
        position: 'top-center'
    })
}

export {successNotification, errorNotification};