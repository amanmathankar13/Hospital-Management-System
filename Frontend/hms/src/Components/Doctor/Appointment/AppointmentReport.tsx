import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {medicineFrequencies, symptoms, tests } from '../../../Data/DrowDownData'
import { IconEye, IconSearch, IconTrash } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { createAppointmentReport, getReportsByPatientId, isReportExists } from '../../../Service/AppointmentService'
import { errorNotification, successNotification } from '../../../Utility/NotificationService'
import { Column } from 'primereact/column'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../../Utility/DateUtility'
import { FilterMatchMode } from 'primereact/api'

type Medicine = {
    name: string;
    medicineId?: number;
    dosage: string;
    frequency: string;
    duration: number;
    route: string;
    type: string;
    instructions: string;
    prescriptionId?: number;
}

const AppointmentReport = ({appointment}:any) => {
    const [loader, setLoading] = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(false);
    const[edit, setEdit]= useState<boolean>(false);
    const form = useForm({
        initialValues:{
            symptoms: [],
            tests: [],
            diagnosis: '',
            referral: '',
            notes: '',
            prescription: {
                notes: '',
                medicines: [] as Medicine[]
            }
        },
        validate:{
            symptoms: (value:any)=>(value.length > 0?null: 'Please select at least one symptom'
            ),
            diagnosis: (value:any) => (value?.trim()? null : 'Diagnosis is required'),
            prescription:{
                medicines: {
                    name: (value:any)=> (value?.trim()? null : "Medicine name is required"),
                    dosage: (value:any) => (value.trim()? null: "Dosage is required"),
                    frequency: (value:any) => (value? null : "Frequency is required"),
                    duration: (value:any)=> (value>0?null : "Duration must be greater than 0"),
                    route: (value:any) => (value? null : "Route is required"),
                    type: (value:any) => (value? null : "Type is required"),
                    instructions: (value:any)=> (value?.trim()? null: "Instruction are required")
                }
            }
        }
    })
    const insertMedicine=()=>{
        form.insertListItem('prescription.medicines', {name:'', dosage: '', frequency: '', duration: 0, route: '', type: '', instructions: ''});
    }
    const removeMedicine=(index: number)=>{
        form.removeListItem('prescription.medicines', index);
    }
    useEffect(() => {
        fetchData();
    }, [appointment]);

    const fetchData=()=>{
        getReportsByPatientId(appointment?.patientId).then((res) => {
            setData(res);
        }).catch((error) => {
            console.error("Error fetching appointment reports:", error);
        });
        isReportExists(appointment?.id).then((res)=>{
            setAllowed(!res);
        }).catch((error)=>{
            console.error("Error checking report existence:", error);
            setAllowed(true);
        });
    }


    const handleSubmit=(values: typeof form.values)=>{
        let data = {
            ...values,
            doctorId: appointment.doctorId,
            patientId: appointment.patientId,
            appointmentId: appointment.id,
            prescription: {
                ...values.prescription,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                appointmentId: appointment.id
            }
        }
        setLoading(true);
        createAppointmentReport(data).then((res)=>{
            successNotification("Report Created Successfully");
            form.reset();
            setEdit(false);
            setAllowed(false);
            fetchData();
        }).catch((error)=>{
            errorNotification(error?.response?.data?.errorMessage || "Failed to create report");
        }).finally(()=>{
            setLoading(false);
        })
    }

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
     const [filters, setFilters] = useState<DataTableFilterMeta>({
             global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    
             
             
    });
     const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
             const value = e.target.value;
             let _filters:any = { ...filters };
     
             _filters['global'].value = value;
     
             setFilters(_filters);
             setGlobalFilterValue(value);
    };
    const actionBodyTemplate = (rowData: any) => {
        

        // return <div className='flex gap-2'>
        //     <ActionIcon color='blue' onClick={()=>navigate("/doctor/appointments/"+rowData.appointmentId)}>
        //         <IconEye size={20} stroke={1.5} />
        //     </ActionIcon>
        // </div>
    };
    const rendorHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {allowed && <Button variant='filled' onClick={()=> setEdit(true)} color='primary' >Add Report</Button>}
                <TextInput leftSection={<IconSearch/>} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        )
    };
    const header = rendorHeader();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
  return (
    <div>
        {!edit ? <DataTable header={header} stripedRows value={data} size='small' paginator  rows={10}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                                filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                                emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                            <Column field="doctorName" header="Doctor" sortable />
                            <Column field="diagnosis" header="Diagnosis" />
                            <Column field="reportDate" header="Report Date" sortable   body={(rowData)=>formatDate(rowData.createdAt)}/>
                            <Column field="notes" header="Notes"/>
                            {/* <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} /> */}
                            {/* <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} /> */}
            </DataTable>
    
    : <form onSubmit={form.onSubmit(handleSubmit)} className='grid gap-5'>
        <Fieldset className='grid gap-3 grid-cols-2' legend={<span className='text-lg font-medium text-primary-500'>Personal information</span>}  radius={'md'}>
            <MultiSelect
            {...form.getInputProps('symptoms')}
            className='col-span-2'
            withAsterisk
            label="Symptoms"
            placeholder="Pick symptoms"
            data={symptoms}
            />
            <MultiSelect
            {...form.getInputProps('tests')}
            className='col-span-2'
            withAsterisk
            label="Tests"
            placeholder="Pick tests"
            data={tests}
            />
            <TextInput {...form.getInputProps('diagnosis')} label='Diagnosis' placeholder='Enter diagnosis' withAsterisk/>
            <TextInput {...form.getInputProps('referral')} label='Referral' placeholder='Enter referral details' />
            <Textarea {...form.getInputProps('notes')} label='Notes' placeholder='Enter any additional notes' />
        </Fieldset>
        <Fieldset className='grid gap-3' legend={<span className='text-lg font-medium text-primary-500'>Prescription</span>}  radius={'md'}>
        {
            form.values.prescription.medicines.map((_medicine: Medicine, index: number)=>
            (
                <Fieldset legend={<div className='flex items-center  gap-4'>
                        <h1 className='text-lg font-medium'>Medicine {index+1}</h1>
                        <ActionIcon onClick={()=> removeMedicine(index)} variant='filled' color='red' size={'md'} className='my-1 flex items-center justify-center'>
                            <IconTrash />
                        </ActionIcon>
                    </div>} className='grid gap-4 col-span-2 grid-cols-2'>
                        <TextInput  {...form.getInputProps(`prescription.medicines.${index}.name`)} label='Medicine' placeholder='Enter medicine name' withAsterisk/>
                        <TextInput {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label='Dosage' placeholder='Enter dosage amount' withAsterisk />
                        <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label='Frequency (Morning-Afternoon-Evening)' placeholder='Enter frequency' withAsterisk data={medicineFrequencies}/>
                        <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder='Enter duration in days' withAsterisk />
                        <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route of Administration" placeholder="Select route" data={['Oral','Intravenous (IV)','Intramuscular (IM)','Subcutaneous (SC)','Inhalation','Topical','Sublingual','Rectal','Ophthalmic (Eye)','Otic (Ear)','Nasal']}/>
                        <Select {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" data={['Tablet','Syrup','Injection','Capsule','Ointment']}/>
                        <TextInput  {...form.getInputProps(`prescription.medicines.${index}.instructions`)} label="Instructions" placeholder='Enter instructions' withAsterisk/>
                </Fieldset>
            )
            )
        }
        <div className='flex my-2 items-center col-span-2 justify-center'>
            <Button onClick={insertMedicine} variant='filled' color='primary' className='col-span-2'>Add Medicine</Button>
        </div>
        </Fieldset>
        <div className='flex items-center justify-center gap-4'>
            <Button type='submit' loading={loader} className='w-full' color='primary' variant='filled'>Submit Report</Button>
            <Button type='reset' className='w-full' color='red' variant='filled'>Reset</Button>
       </div>
    </form>}
    </div>
  )
}

export default AppointmentReport