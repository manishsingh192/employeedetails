import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid2,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

function App() {
  const [data, setData] = useState(() => {
    // Load initial data from local storage.....................
    const storedData = localStorage.getItem('employeeData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
  });

  useEffect(() => {

    // Syncc data to local storage when data changes..........
    localStorage.setItem('employeeData', JSON.stringify(data));
  }, [data]);

  const handleEdit = (id) => {
    const selectedItem = data.find(item => item.id === id);
    if (selectedItem) {
      setFormData(selectedItem);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
    }
  };

  const handleSave = () => {
    if (formData.id && formData.name && formData.email) {
      const existingIndex = data.findIndex(item => item.id === formData.id);
      if (existingIndex >= 0) {
        const updatedData = [...data];
        updatedData[existingIndex] = formData;
        setData(updatedData);
      } else {
        setData([...data, formData]);
      }
      handleClear();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleClear = () => {
    setFormData({ id: '', name: '', email: '', password: '', address: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Employee Detail
      </Typography>

      <Grid2 container spacing={2}>
        {['id', 'name', 'email', 'password', 'address'].map(field => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={field}>
            <TextField
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid2>
        ))}

        <Grid2 item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(item.id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
