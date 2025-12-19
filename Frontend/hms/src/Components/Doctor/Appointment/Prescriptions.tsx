import { ActionIcon, Center, TextInput } from '@mantine/core';
import { IconEye, IconSearch, IconTrash } from '@tabler/icons-react';
import { FilterMatchMode} from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { getPrescriptionsByPatientId } from '../../../Service/AppointmentService';
import { formatDate } from '../../../Utility/DateUtility';
import { useNavigate } from 'react-router-dom';

const Prescriptions = ({appointment}: any) => {


 const [data, setData] = useState<any[]>([]);
 const navigate = useNavigate();


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
        

        return <div className='flex gap-2'>
            <ActionIcon color='blue' onClick={()=>navigate("/doctor/appointments/"+rowData.appointmentId)}>
                <IconEye size={20} stroke={1.5} />
            </ActionIcon>
        </div>
    };


  useEffect(() => {
    // Fetch prescriptions data based on appointment prop if needed
    getPrescriptionsByPatientId(appointment?.patientId).then((res) => {
        console.log("Prescriptions Data:", res);
        setData(res);
       
    }).catch((error) => {
        console.error("Error fetching prescriptions:", error);
    });
    }, [appointment.patientId]);

  const rendorHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-end items-center">
         <TextInput leftSection={<IconSearch/>} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        )
    };
  const header = rendorHeader();

  return (
    <div>
    <DataTable header={header} stripedRows value={data} size='small' paginator  rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                        filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                        emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="doctorName" header="Doctor" sortable />
                    <Column field="prescriptionDate" header="Prescription Date" sortable   body={(rowData)=>formatDate(rowData.prescriptionDate)}/>
                    <Column field="medicines" header="Medicines"    body={(rowdata)=>rowdata.medicines?.length ?? 0}/>
                    <Column field="notes" header="Notes"  style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                    
                    {/* <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} /> */}
    </DataTable>
    </div>
  )
}

export default Prescriptions;
