import { Badge, Card, Divider, Group, Stack, Tabs, Text, Title } from '@mantine/core';
import {Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getAppoinmentDetails } from '../../../Service/AppointmentService';
import { formatDateTime } from '../../../Utility/DateUtility';
import { IconPhoto, IconMessageCircle, IconSettings, IconClipboardHeart, IconHistoryToggle, IconPillFilled } from '@tabler/icons-react';
import AppointmentReport from './AppointmentReport';

// const items = [
//   { title: 'Mantine', href: '#' },
//   { title: 'Mantine hooks', href: '#' },
//   { title: 'use-id', href: '#' },
// ].map((item, index) => (
//   <Anchor href={item.href} key={index}>
//     {item.title}
//   </Anchor>
// ));
const AppointmentDetails = () => {
  const {id} = useParams();
  const[appointment, setAppointment] = useState<any>({});

  useEffect(() => {
    getAppoinmentDetails(id).then((data) => {
        console.log("Appointment Details:", data);
        setAppointment(data);
    }).catch((error) => {
        console.error("Error fetching appointment details:", error);
    });
  },[id]);
  return (
    <div>
        <Breadcrumbs>
            <Link className='text-primary-500 hover:underline' to="/doctor/dashboard">Dashboard</Link>
            <Link className='text-primary-500 hover:underline' to="/doctor/appointments">Appointments</Link>
            <Text>Details</Text>
        </Breadcrumbs>
        <div className='mt-16'>
                    <Card
      shadow="md"
      radius="lg"
      withBorder
      p="lg"
      style={{
        borderColor: "primary.6",
      }}
    >
      <Group justify="space-between" mb="xs">
        <Title order={3} c="primary">
          Appointment Details
        </Title>
        <Badge color="primary" variant="filled" size="lg">
          {appointment.appointmentStatus}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">Scheduled Time:</Text>
        <Text fw={500} c="primary">
          {formatDateTime(appointment.appointmentTime)}
        </Text>

        <Divider my="sm" />

        <Text fw={600} c="primary">Patient</Text>
        <Text>{appointment.patientName} (ID: {appointment.patientId})</Text>
        <Text>Email: {appointment.patientEmail}</Text>
        <Text>Phone: {appointment.patientPhone}</Text>

        <Divider my="sm" />

        <Text fw={600} c="primary">Reason</Text>
        <Text>{appointment.reason}</Text>

        <Text fw={600} c="primary" mt="sm">Notes</Text>
        <Text>{appointment.notes}</Text>
      </Stack>
    </Card>
    <Tabs variant="pills" my={'md'} defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="history"  leftSection={<IconHistoryToggle size={20} />}>
          Medical History
        </Tabs.Tab>
        <Tabs.Tab value="prescription" leftSection={<IconPillFilled size={20} />}>
          Prescriptions
        </Tabs.Tab>
        <Tabs.Tab value="report" leftSection={<IconClipboardHeart size={20} />}>
          Report
        </Tabs.Tab>
      </Tabs.List>
      <Divider my={'md'}/>
      <Tabs.Panel value="history">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="prescription">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="report">
        <AppointmentReport appointment={appointment}/>
      </Tabs.Panel>
    </Tabs>

        </div>
    </div>
  )
}

export default AppointmentDetails