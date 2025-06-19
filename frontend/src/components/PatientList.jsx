import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TextField,
  IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogActions, Button, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../api/axios';
import { getRole, getToken } from '../utils/auth';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
  const role = getRole();

  const fetchPatients = async () => {
    try {
      const res = await API.get('/patients/', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setPatients(res.data);
    } catch {
      setSnack({ open: true, message: 'Failed to fetch patients', severity: 'error' });
    }
  };

  const deletePatient = async () => {
    try {
      await API.delete(`/patients/${confirmDialog.id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setSnack({ open: true, message: 'Patient deleted', severity: 'success' });
      setPatients(patients.filter(p => p.id !== confirmDialog.id));
      setConfirmDialog({ open: false, id: null });
    } catch {
      setSnack({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  const updateNote = async (id, notes) => {
    try {
      await API.put(`/patients/${id}`, { notes }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setSnack({ open: true, message: 'Note updated', severity: 'success' });
    } catch {
      setSnack({ open: true, message: 'Failed to update note', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <h2 style={{ marginBottom: 16 }}>Patient List</h2>
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'Age', 'Gender', 'Diagnosis', 'Notes'].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            {role === 'receptionist' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.age}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.diagnosis}</TableCell>
              <TableCell>
                {role === 'doctor' ? (
                  <TextField
                    defaultValue={p.notes}
                    onBlur={(e) => updateNote(p.id, e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                ) : (
                  p.notes
                )}
              </TableCell>
              {role === 'receptionist' && (
                <TableCell>
                  <IconButton onClick={() => setConfirmDialog({ open: true, id: p.id })}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })}>
        <DialogTitle>Are you sure you want to delete this patient?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Cancel</Button>
          <Button onClick={deletePatient} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
