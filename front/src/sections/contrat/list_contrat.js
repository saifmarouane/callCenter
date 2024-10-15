import React, { useState, useEffect,useRef,useContext } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link, BrowserRouter,useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { ContratsSearch } from '../../sections/contrat/contrats-search';
import { ContractContext } from '../../sections/contrat/DetailContext';
import { ContractProvider } from '../../sections/contrat/DetailContext';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';

export const List = () => {
  const [localFormData, setLocalFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const user = JSON.parse(window.sessionStorage.getItem('user'));
  const username=user.username
  const userRole=user.role
  useEffect(() => {
    let apiUrl = 'http://localhost:8000/auth/userforms/';
    if (userRole !== 'admin') {
      apiUrl += 'list/'+username+'/';
    }

    axios.get(apiUrl)
      .then(response => {
        setLocalFormData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [userRole]);

  

  const handleDelete = (index) => {
    const updatedFormData = [...localFormData];
    updatedFormData.splice(index, 1);
    setLocalFormData(updatedFormData);
    axios.delete('http://localhost:8000/auth/userforms/detail/'+index+'/')
    .then(() => {
      alert(

        'suprimée avec succès'
      )
      // Handle success hereal
    })
    .catch(error => {
      console.error('Axios error:', error);
      // Handle errors here
    });
  };
  

  const handleDetail = (data) => {
        setIsLoading(true);
        //setSelectedDetail(data);
        window.sessionStorage.setItem('selectedDetail', JSON.stringify(data));

        // Utilisez history pour naviguer et passer les données
        router.push('/contrats/details_contrat');

        setIsLoading(false);
    };
  
  

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredData = localFormData.filter(data => 
    data.date_submitted.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <BrowserRouter>
      <TableContainer component={Paper}>
        <ContratsSearch onSearchChange={handleSearchChange} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id contrat</TableCell>
              <TableCell>nom client</TableCell>
              <TableCell>statut</TableCell>
              <TableCell>date</TableCell>
              <TableCell>prixTotale</TableCell>

              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index=data.id}</TableCell>
                  <TableCell>{data.fullname}</TableCell>
                  <TableCell>{data.fstatut}</TableCell>
                  <TableCell>
                  {data.date_submitted}
                  </TableCell>
                  <TableCell>{data.total_prixcontracts} €</TableCell>

                  <TableCell>
                    <Button 
                      color="primary"
                      onClick={() => {handleDetail(data)}}
                      startIcon={<InfoIcon />}
                    />

                    <Button 
                      color="secondary" 
                      onClick={() => handleDelete(index)}
                      startIcon={<DeleteIcon />}
                    />
                            
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Aucune donnée à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </BrowserRouter>

  );
};

List.propTypes = {
};
