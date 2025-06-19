import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField, Button, MenuItem, Snackbar, Alert, Box
} from '@mui/material';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      setSnack({ open: true, message: 'All fields are required', severity: 'warning' });
      return;
    }

    try {
      await API.post('/register', formData);
      setSnack({ open: true, message: 'Registration successful! Redirecting to login...', severity: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setSnack({ open: true, message: 'Registration failed. Try another username.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="receptionist">Receptionist</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
