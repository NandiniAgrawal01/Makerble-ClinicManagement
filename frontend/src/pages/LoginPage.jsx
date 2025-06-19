import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField, Button, Snackbar, Alert, Box
} from '@mui/material';
import API from '../api/axios';
import { saveToken, saveRole } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post('/login', credentials);
      saveToken(res.data.token);
      saveRole(res.data.role);
      navigate('/dashboard');
    } catch {
      setSnack({ open: true, message: 'Invalid login credentials', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
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
