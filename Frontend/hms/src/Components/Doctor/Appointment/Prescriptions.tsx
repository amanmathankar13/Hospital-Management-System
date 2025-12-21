import { ActionIcon, Badge, Card, Divider, Group, Modal, Stack, TextInput, Text } from '@mantine/core';
import { IconEye, IconSearch, IconVaccineBottle } from '@tabler/icons-react';
import { FilterMatchMode} from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { getPrescriptionsByPatientId } from '../../../Service/AppointmentService';
import { formatDate } from '../../../Utility/DateUtility';
import { useNavigate } from 'react-router-dom';
import { useDisclosure} from '@mantine/hooks';

const Prescriptions = ({appointment}: any) => {


 const [data, setData] = useState<any[]>([]);
 const navigate = useNavigate();

 const[medicineData, setMedicineData]= useState<any>([]);

 const[opened, {open, close}]= useDisclosure(false);


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

    const handleMedicineView=(medicines:any[])=>{
        console.log("Medicines:", medicines);
        open();
        setMedicineData(medicines);
    };

    const actionBodyTemplate = (rowData: any) => {
        

        return <div className='flex gap-2'>
            <ActionIcon color='blue' onClick={()=>navigate("/doctor/appointments/"+rowData.appointmentId)}>
                <IconEye size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color='red' onClick={()=>handleMedicineView(rowData.medicines)}>
                <IconVaccineBottle size={20} stroke={1.5} />
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
      <Modal opened={opened} size="xl" onClose={close} title="Medicines Prescribed"  centered>
        <div className='grid grid-cols-2 gap-5'>
        {medicineData?.map((medicine:any, index:number)=>(
        <Card key={index} shadow="sm" radius="md" withBorder>
        <Stack >
          {/* Medicine Name */}
          <Group justify="space-between">
            <Text fw={600} size="lg">
              {medicine.name}
            </Text>
            <Badge color="blue" variant="light">
              {medicine.type}
            </Badge>
          </Group>

          <Divider />

          {/* Dosage & Frequency */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Dosage
            </Text>
            <Text size="sm">{medicine.dosage}</Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Frequency
            </Text>
            <Text size="sm">{medicine.frequency}</Text>
          </Group>

          {/* Route */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Route
            </Text>
            <Text size="sm">{medicine.route}</Text>
          </Group>

          {/* Duration */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Duration
            </Text>
            <Text size="sm">{medicine.duration} days</Text>
          </Group>

          <Divider />

          {/* Instructions */}
          <Text size="sm" fw={500}>
            Instructions
          </Text>
          <Text size="sm" c="dimmed">
            {medicine.instructions}
          </Text>
        </Stack>
      </Card>
        ))}
        </div>
        {
            medicineData.length===0 && <Text>No medicines prescribed.</Text>
        }
      </Modal>
    </div>
  )
}

export default Prescriptions;
