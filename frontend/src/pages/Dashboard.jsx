import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Tabs, Tab, Container, Paper
} from '@mui/material';
import { getRole, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Patient Management Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">
            Welcome, <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          </Typography>
        </Paper>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} centered>
            {role === 'receptionist' && <Tab label="Add Patient" />}
            <Tab label="View Patients" />
          </Tabs>
        </Paper>

        {tab === 0 && role === 'receptionist' && <PatientForm refresh={() => setTab(1)} />}
        {(tab === 1 || role === 'doctor') && <PatientList />}
      </Container>
    </>
  );
}
