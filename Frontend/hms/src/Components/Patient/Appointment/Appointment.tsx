
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ActionIcon, Button, LoadingOverlay, Modal, Select, Text, Textarea } from '@mantine/core';
import { Tag } from 'primereact/tag';
import { TextInput } from '@mantine/core';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { getDoctorDropDown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../../Data/DrowDownData';
import { useSelector } from 'react-redux';
import { cancelAppoinment, getAllAppointments,  scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../../Utility/NotificationService';
import { formatDateTime } from '../../../Utility/DateUtility';
import { modals } from '@mantine/modals';
import 'primereact/resources/themes/lara-light-blue/theme.css'

interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string | Date;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const Appointment=()=> {
    const [loading, setLoading] = useState<boolean>(false);
    const[appointment, setAppointment] = useState<any[]>([]);
    const user = useSelector((state:any)=> state.user);
    const[doctors, setDoctors] = useState<any>();
    const [opened,{open,close}] = useDisclosure(false);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        doctorName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        reason: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        appointmentStatus: { value: null, matchMode: FilterMatchMode.IN },
        notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    
    

    const getSeverity = (appointmentStatus: string) => {
        switch (appointmentStatus) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };
    // [{label: 'unqualified', value : 'unqualified'}]

    useEffect(() => {
        getAllAppointments(user.profileId).then((data)=>{
            console.log(data)
            setAppointment(data);
        }).catch((error)=>{
            console.log(error)
        })
        getDoctorDropDown().then((data)=>{
            setDoctors(data.map((doctors:any)=>({
                value: ""+doctors.id,
                label: doctors.name
            })));
        }).catch((error)=>{
            console.log(error);
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    

    

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters:any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const form = useForm({
    initialValues: {
      doctorId: '',
      patientId: user.profileId,
      appointmentTime: null,
      reason: '',
      notes: '',
    },

    validate: {
        doctorId: (value:any) =>
            value ? null : 'Doctor is required',
        appointmentTime: (value:any) =>
            value ? null : 'Appointment Time is required',
        reason: (value:any) =>
            value ? null : 'Reason is required',
    },
    });

    const handleSubmit=(values:any)=>{
        console.log("Appointment scheduled with", values);
        setLoading(true);
        scheduleAppointment(values).then((data)=>{
            close();
            form.reset();
            successNotification("Appointment Scheduled Successfully");
        }).catch((error)=>{
            errorNotification(error.response?.data?.errorMessage || "Failed to schedule appointment");
        }).finally(()=>{
            setLoading(false);
        });
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                    <Button leftSection={<IconPlus/>} onClick={open} variant="filled">Schedule Appointment</Button>
                    <TextInput leftSection={<IconSearch/>} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };



    const statusBodyTemplate = (rowData: any) => {
        return <Tag value={rowData.appointmentStatus} severity={getSeverity(rowData.appointmentStatus)} />;
    };


    const handleDelete=(rowData:any)=>{
            modals.openConfirmModal({
            title: <span className="text-xl font-sans font-semibold">Cancel Appointment</span>,
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to cancel your appointment? This action is destructive and you will have
                    to contact support to restore your data.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: "Close" },
            confirmProps: { color: 'red' },
            onConfirm: () => {
                cancelAppoinment(rowData.id).then(()=>{
                successNotification("Appointment Cancelled Successfully")
                setAppointment(appointment.map((appointment)=>
                    appointment.id===rowData.id? {...appointment, appointmentStatus: "CANCELLED"}:appointment
                ))
            }).catch((error)=>{
                console.log(error)
                errorNotification(error.response?.data?.errorMessage||"Failed to cancel appointment");
            })
            }
    });

    }

    const actionBodyTemplate = (rowData: any) => {
        return <div className='flex gap-2'>
            <ActionIcon>
                <IconEdit size={20} stroke={1.5}/>
            </ActionIcon>
            {rowData.appointmentStatus!=="CANCELLED"&&<ActionIcon color='red' onClick={()=>handleDelete(rowData)}>
                <IconTrash size={20} stroke={1.5} />
            </ActionIcon>
            }
        </div>
    };

    const header = renderHeader();


    const timeTemplate=(rowData:any)=>{
        return <span>{formatDateTime(rowData.appointmentTime)}</span>
    }

    return (
        <div className="card">
            <DataTable stripedRows value={appointment} size='small' paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedCustomers} 
                    onSelectionChange={(e) => {
                        const customers = e.value as Customer[];
                        setSelectedCustomers(customers);
                    }}
                    filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'reason', 'notes', 'appointmentStatus']}
                    emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="doctorName" header="Doctor" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="appointmentTime" header="Appointment Time" sortable  style={{ minWidth: '14rem' }} body={timeTemplate} />
                <Column field="reason" header="Reason" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="notes" header="Notes" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="appointmentStatus" header="Status" sortable filter filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate}   style={{ minWidth: '12rem' }}  />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>
            <Modal opened={opened} size={'md'} onClose={close} title={<div className="text-xl font-semibold text-primary-500" >Schedule Appointment</div>} centered>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <form  onSubmit={form.onSubmit(handleSubmit)}  className='flex flex-col gap-5 justify-center'>
                <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder='Select Doctor'/>
                <DateTimePicker valueFormat="DD MMM YYYY hh:mm A" minDate={new Date()}  {...form.getInputProps("appointmentTime")} withAsterisk label="Appointment time" placeholder="Pick date and time"  />
                <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason for Appointment" placeholder='Enter reason for appointment'/>
                <Textarea {...form.getInputProps("notes")}  label='Additional Notes' rows={5} cols={5} placeholder='Enter any additional notes'/>
                <Button type="submit" variant="filled" fullWidth>Submit</Button>
            </form>
    </Modal>
        </div>
    );
}
export default Appointment;