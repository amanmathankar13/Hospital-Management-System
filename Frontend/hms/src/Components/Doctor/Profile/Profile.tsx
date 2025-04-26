import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {doctorDepartments, doctorSpecializations } from '../../../Data/DrowDownData';
import { useDisclosure } from '@mantine/hooks';
import { getDoctor } from '../../../Service/DoctorProfileService';
import { formatDate } from '../../../Utility/DateUtility';

const Profile = () => {
    // const doctor = {
    //     dob: "1990-06-15",
    //     phoneNumber: "+1 234 567 890",
    //     address: "123 Main St, Springfield",
    //     licenseNumber: "A123456789",
    //     specialization: "O+",
    //     department: "Peanuts",
    //     experience: "Diabetes"
    // };
    const[edit, setEdit] = useState(false);
    const user = useSelector((state:any)=> state.user);
    const[opened,{open,close}] = useDisclosure(false);

    const[profile, setProfile] = useState<any>({});

    useEffect(()=>{
        console.log(user);
        getDoctor(user.profileId).then((data)=>{
            setProfile(data);
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [user])
  return (
    <div className='p-10'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
                <div className='flex flex-col items-center gap-3'>
                    <Avatar variant='filled' src="/avatar.png" size={150} alt="it's me" />
                    {edit&&<Button onClick={open} size='sm' variant='filled'>Upload</Button>}
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-3xl font-medium text-neuTable.Tral-900'>{user.name}</div>
                    <div className='text-xl text-neuTable.Tral-700'>{user.email}</div>
                </div>
            </div>
            {!edit ? <Button onClick={()=> setEdit(true)} size='lg' variant='filled' leftSection={<IconEdit/>}>Edit</Button>:<Button onClick={()=> setEdit(false)} size='lg' variant='filled'>Save</Button>}
        </div>
        <Divider my={'xl'}/>
        <div>
            <div className='text-2xl font-medium mb-5 text-neuTable.Tral-900'>Personal Information</div>
            <Table striped withRowBorders={false} stripedColor='primary.1' verticalSpacing={'md'}>
                <Table.Tbody className='[&>tr]:!mb-3'>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Date of Birth</Table.Td>
                        {edit?<Table.Td className='text-xl'><DateInput placeholder="Date of birth"/></Table.Td>:<Table.Td className='text-xl'>{formatDate(profile.dob)}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Phone</Table.Td>
                        {edit?<Table.Td className='text-xl'><NumberInput placeholder='Phone number' hideControls maxLength={10} clampBehavior='strict' minLength={10}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.phoneNumber}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Address</Table.Td>
                        {edit?<Table.Td className='text-xl'><TextInput
                            placeholder={'Address'}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.address}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>License Number</Table.Td>
                        {edit?<Table.Td className='text-xl'><NumberInput placeholder='License number' hideControls maxLength={12} clampBehavior='strict' minLength={12}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.licenseNumber}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Specialization</Table.Td>
                        {edit?<Table.Td className='text-xl'><Select data={doctorSpecializations} placeholder='Specialization'/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.specialization}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Department</Table.Td>
                        {edit?<Table.Td className='text-xl'><Select data={doctorDepartments} placeholder='Department'/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.department}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Experience</Table.Td>
                        {edit?<Table.Td className='text-xl'><NumberInput placeholder='Experience' hideControls max={50} clampBehavior='strict'/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.experience} years</Table.Td>}
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </div>
        <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
        {/* Modal content */}
        </Modal>
    </div>
  )
}

export default Profile;
