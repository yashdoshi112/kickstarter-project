import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
      setProjects(JSON.parse(JSON.stringify(response?.data)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const displayProjects = () => {
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    return projects.slice(start, end);
  };

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  return (
    <Box
      sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}
      role="main"
      aria-label="Kickstarter Projects Table"
    >
      <Typography variant="h4" gutterBottom>
        Kickstarter Projects
      </Typography>
      <TableContainer component={Paper} role="table" aria-label="Projects Data">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" scope="col">
                S.No.
              </TableCell>
              <TableCell align="center" scope="col">
                Percentage Funded
              </TableCell>
              <TableCell align="center" scope="col">
                Amount Pledged
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayProjects().map((project, index) => (
              <TableRow key={index}>
                <TableCell align="center" scope="row">
                  {project["s.no"]}
                </TableCell>
                <TableCell align="center">
                  {project["percentage.funded"]?.toLocaleString() || 'N/A'}%
                </TableCell>
                <TableCell align="center">
                  {project["currency"]} {project["amt.pledged"]?.toLocaleString() || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}
        role="navigation"
        aria-label="Pagination Controls"
      >
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to Previous Page"
          aria-disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography
          aria-live="polite"
          aria-atomic="true"
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Go to Next Page"
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default App;
