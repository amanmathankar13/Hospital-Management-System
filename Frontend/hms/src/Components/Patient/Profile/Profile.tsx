import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { bloodGroup, bloodGroups } from '../../../Data/DrowDownData';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../../Service/PatientProfileService';
import { formatDate } from '../../../Utility/DateUtility';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationService';
import { arrayToCSV } from '../../../Utility/OtherUtility';

const Profile = () => {
    // const patient = {
    //     dob: "1990-06-15",
    //     phoneNumber: "+1 234 567 890",
    //     address: "123 Main St, Springfield",
    //     identityNumber: "A123456789",
    //     bloodGroup: "O+",
    //     allergies: "Peanuts",
    //     chronicDisease: "Diabetes"
    // };


    const[edit, setEdit] = useState(false);
    const user = useSelector((state:any)=> state.user);
    const[opened,{open,close}] = useDisclosure(false);
    const[profile, setProfile] = useState<any>({});

    useEffect(()=>{
        getPatient(user.profileId).then((data)=>{
            setProfile({...data, allergies : data.allergies ? JSON.parse(data.allergies):null, chronicDisease : data.chronicDisease?JSON.parse(data.chronicDisease):null});
        }).catch((error)=>{
            console.log(error);
        })
    }, [user.profileId])
    const form = useForm({
        initialValues: {
            dob: '',
            phoneNumber: '',
            address: '',
            identityNumber: '',
            bloodGroup: '',
            allergies: [],
            chronicDisease: []
        },
        validate: {
            dob: (value:any)=> !value ? "Date of Birth is required" : undefined,
            phoneNumber: (value:any)=> !value ? "Phone Number is required" : undefined,
            address: (value:any)=> !value ? "Address is required" : undefined,
            identityNumber: (value:any)=> !value ? "Identity Number is required" : undefined,
        },
    });
    const handleEdit=()=>{
        form.setValues({...profile, dob: profile.dob? new Date(profile.dob):undefined, chronicDisease: profile.chronicDisease?? [], allergies : profile.allergies?? []});
        setEdit(true)
    }
    const handleSubmit=(e:any)=>{
         let values = form.getValues();
        form.validate();
            updatePatient({...profile, ...values, allergies: values.allergies?JSON.stringify(values.allergies):null, chronicDisease: values.chronicDisease?JSON.stringify(values.chronicDisease):null}).then((data)=>{
            successNotification("Profile updated successfully")
            setProfile({...data, allergies : data.allergies ? JSON.parse(data.allergies):null, chronicDisease : data.chronicDisease?JSON.parse(data.chronicDisease):null});
            setEdit(false)
        }).catch((error)=>{
            errorNotification(error.response.data.errorMessage)
        })
    }
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
            {!edit ? <Button onClick={handleEdit} type='button' size='lg' variant='filled' leftSection={<IconEdit/>}>Edit</Button>:<Button onClick={handleSubmit} type='submit' size='lg' variant='filled'>Save</Button>}
        </div>
        <Divider my={'xl'}/>
        <div>
            <div className='text-2xl font-medium mb-5 text-neuTable.Tral-900'>Personal Information</div>
            <Table striped withRowBorders={false} stripedColor='primary.1' verticalSpacing={'md'}>
                <Table.Tbody className='[&>tr]:!mb-3 [&_td]:!w-1/2'>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Date of Birth</Table.Td>
                        {edit?<Table.Td className='text-xl'><DateInput {...form.getInputProps("dob")} placeholder="Date of birth"/></Table.Td>:<Table.Td className='text-xl'>{formatDate(profile.dob) ?? "-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Phone</Table.Td>
                        {edit?<Table.Td className='text-xl'><NumberInput {...form.getInputProps("phoneNumber")} placeholder='Phone number' hideControls maxLength={10} clampBehavior='strict' minLength={10}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.phoneNumber ?? "-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Address</Table.Td>
                        {edit?<Table.Td className='text-xl'><TextInput {...form.getInputProps("address")}
                            placeholder={'Address'}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.address ?? "-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Identity Number</Table.Td>
                        {edit?<Table.Td className='text-xl'><NumberInput {...form.getInputProps("identityNumber")} placeholder='Identity number' hideControls maxLength={12} clampBehavior='strict' minLength={12}/>
                        </Table.Td>:<Table.Td className='text-xl'>{profile.identityNumber ?? "-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Blood Group</Table.Td>
                        {edit?<Table.Td className='text-xl'><Select {...form.getInputProps("bloodGroup")} data={bloodGroups} placeholder='Blood group'/>
                        </Table.Td>:<Table.Td className='text-xl'>{bloodGroup[profile.bloodGroup] ?? "-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Allergies</Table.Td>
                        {edit?<Table.Td className='text-xl'><TagsInput {...form.getInputProps("allergies")} placeholder="Allergies" />
                        </Table.Td>:<Table.Td className='text-xl'>{profile.allergies?arrayToCSV(profile.allergies):"-"}</Table.Td>}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td className='font-semibold text-xl'>Chronic Disease</Table.Td>
                        {edit?<Table.Td className='text-xl'><TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic disease" />
                        </Table.Td>:<Table.Td className='text-xl'>{profile.chronicDisease?arrayToCSV(profile.chronicDisease): "-"}</Table.Td>}
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
