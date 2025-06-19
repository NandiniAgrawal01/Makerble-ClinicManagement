import React, { useState } from 'react';
import {
  TextField, Grid, Button, MenuItem, Snackbar, Alert, Paper
} from '@mui/material';
import API from '../api/axios';

export default function PatientForm({ refresh }) {
  const [data, setData] = useState({ name: '', age: '', gender: '', diagnosis: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const validate = () => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!data.age || isNaN(data.age)) errs.age = 'Valid age is required';
    if (!data.gender) errs.gender = 'Gender is required';
    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await API.post('/patients/', { ...data, age: Number(data.age) });
      setSnack({ open: true, message: 'Patient registered successfully', severity: 'success' });
      setData({ name: '', age: '', gender: '', diagnosis: '', notes: '' });
      setErrors({});
      if (refresh) refresh();
    } catch {
      setSnack({ open: true, message: 'Failed to register patient', severity: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <h2 style={{ marginBottom: 16 }}>Add New Patient</h2>
      <Grid container spacing={2}>
        {['name', 'age', 'diagnosis', 'notes'].map((field, idx) => (
          <Grid item xs={12} sm={field === 'notes' ? 12 : 6} key={idx}>
            <TextField
              label={field[0].toUpperCase() + field.slice(1)}
              fullWidth
              type={field === 'age' ? 'number' : 'text'}
              value={data[field]}
              onChange={(e) => setData({ ...data, [field]: e.target.value })}
              error={!!errors[field]}
              helperText={errors[field]}
              multiline={field === 'notes'}
              rows={field === 'notes' ? 3 : 1}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            fullWidth
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
