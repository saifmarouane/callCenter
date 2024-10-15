// details.js
import React from 'react';
import { Button, Container, Paper  } from '@mui/material';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState} from 'react';
import { ContractContext } from '../../sections/contrat/DetailContext';
import { useLocation } from 'react-router-dom';
import {  BrowserRouter } from 'react-router-dom';
import {    FormControl, InputLabel, Select, MenuItem,makeStyles } from '@material-ui/core';
import axios from 'axios';
import {   SvgIcon } from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';

import {
  Grid,
  Avatar,
  TextField,
  Scrollbar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton
} from '@mui/material';
const useStyles = makeStyles((theme) => ({
  noOutline: {
    border: 'none',
    },
  card: {
    padding: theme.spacing(1),
    marginTop:'20px',
    margin: theme.spacing(1),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Ombre portée ajoutée ici

  },
  title: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginBottom:'5px',
    color: '#333',
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

export const Details = ({  onDelete, onModify }) => {
  const selectedDetail = JSON.parse(window.sessionStorage.getItem('selectedDetail'));
  const classes = useStyles();
  const [contrats, setcontrats] = useState([
    {
      Société_a_résilier: '',
      Type_de_Résiliation: '',
      Type_de_contrat: '',
      Nom_assurance: '',
      Adresse: '',
      N_contrat: '',
      N_SS: '',
      Code_postale: '',
      Ville: '',
      Nombre_de_contrat: '',
      N_RAR: '',
      Commentaire: '',
      Date_effet: '',
      Date_de_résiliation: '',
    },
]);

const addForm = () => {
    setcontrats([...contrats, {
      Société_a_résilier: '',
      Type_de_Résiliation: '',
      Type_de_contrat: '',
      Nom_assurance: '',
      Adresse: '',
      N_contrat: '',
      N_SS: '',
      Code_postale: '',
      Ville: '',
      Nombre_de_contrat: '',
      N_RAR: '',
      Commentaire: '',
      Date_effet: '',
      Date_de_résiliation: '',
    }]);
};



  const handleDelete = () => {
    if (onDelete) {
      onDelete(selectedDetail.id);
    }
  };

  const handleModify = () => {
    if (onModify) {
      onModify(selectedDetail);
    }
  };
 

  

  const [successMessage, setSuccessMessage] = useState("");

////////////////////////////////////////


    let user = null;

    try {
      const userData = window.sessionStorage.getItem('user');
      
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (error) {
      // Gérer les erreurs de parsing JSON ici
      console.error("Erreur lors de l'analyse des données utilisateur :", error);
    }

    // Vous pouvez ensuite utiliser 'user' en toute sécurité
    const username = user ? user.username : '';    
    const [fullname, setFullname] = useState(selectedDetail.fullname);
    const [fPrenom, setfPrenom] = useState(selectedDetail.fPrenom);
    const [fNai, setfNai] = useState(selectedDetail.fNai);
    const [fSexe, setfSexe] = useState(selectedDetail.fSexe);
    const [fRegime, setfRegime] = useState(selectedDetail.fRegime);
    const [fSitu, setfSitu] = useState(selectedDetail.fSitu);
    const [fville, setfville] = useState(selectedDetail.fville);
    const [fAdresse, setfAdresse] = useState(selectedDetail.fAdresse);
    const [fAdresse2, setfAdresse2] = useState(selectedDetail.fAdresse2);
    const [fCpo, setfCpo] = useState(selectedDetail.fCpo);
    const [ftel, setftel] = useState(selectedDetail.ftel);
    const [ftel1, setftel1] = useState(selectedDetail.ftel1);
    const [factive, setfactive] = useState(selectedDetail.factive);
    const [fprof, setfprof] = useState(selectedDetail.fprof);
    const [fPays_de_naissance, setfPays_de_naissance] = useState(selectedDetail.fPays_de_naissance);
    const [fvilN, setfvilN] = useState(selectedDetail.fvilN);
    const [fCP, setfCP] = useState(selectedDetail.fCP);
    const [fCom, setfCom] = useState(selectedDetail.fCom);
    const [fEmail, setfEmail] = useState(selectedDetail.fEmail);
    const [fstatut, setfstatut] = useState(selectedDetail.fstatut);
    

    const [isConfirmed, setIsConfirmed] = useState(false);

/////////////////////////////
const defaultValues = {
  username: selectedDetail.username,
  fullname: selectedDetail.fullname,
  fPrenom: selectedDetail.fPrenom,
  fNai: selectedDetail.fNai,
  fRegime: selectedDetail.fRegime,
  fSitu: selectedDetail.fSitu,
  fville: selectedDetail.fville,
  fAdresse: selectedDetail.fAdresse,
  fAdresse2: selectedDetail.fAdresse2,
  fCpo: selectedDetail.fCpo,
  fSexe: selectedDetail.fSexe,
  ftel: selectedDetail.ftel,
  ftel1: selectedDetail.ftel1,
  fprof: selectedDetail.fprof,
  fPays_de_naissance: selectedDetail.fPays_de_naissance,
  fEmail: selectedDetail.fEmail,
  fvilN: selectedDetail.fvilN,
  fCP: selectedDetail.fCP,
  factive: selectedDetail.factive,
  fCom: selectedDetail.fCom,
  fstatut: selectedDetail.fstatut, // Assurez-vous que fstatut est défini quelque part dans votre composant
  contrats: selectedDetail.contrats
  // ... autres valeurs par défaut ...
};

//putost
const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForms = [...contrats];

    if (updatedForms[index]) {
        updatedForms[index][name] = value.trim() !== "" ? value : defaultValues[name];
        setcontrats(updatedForms);
        console.log(updatedForms);
    } else {
        // Gérer le cas où l'index n'est pas valide
    }
};
const handleSubmit = (e, index) => {
  event.preventDefault(); // Empêche le rechargement de la page

  e.preventDefault();
};
function addPost(event) {



  const post = {
    username,
    fullname,
    fPrenom,
    fNai: convertDate(fNai),
    fRegime,
    fSitu,
    fville,
    fAdresse,
    fAdresse2,
    fCpo,
    fSexe,
    ftel,
    ftel1,
    fprof,
    fPays_de_naissance,
    fEmail,
    fvilN,
    fCP,
    factive,
    fCom,
    fstatut, // Assurez-vous que fstatut est défini quelque part dans votre composant
    contrats
};

  event.preventDefault(); // Empêche le rechargement de la page

  console.log("data",post)
  axios.put('http://localhost:8000/auth/userforms/update/'+selectedDetail.id+'/', post)
  .then(response => {
      console.log('reponse',response.data);
      setIsConfirmed(true);

      setSuccessMessage("Les informations ont été modifiées avec succès!");
  })
  .catch(error => {
     console.error('Erreur lors de l\'envoi des données:', error);
     setSuccessMessage("Les informations ont pas  été modifiées !");

  });
  


  
 }

//////
  return (
    <BrowserRouter>

    <Card style={{ 
    padding: '5px', 
 
    margin: '2rem', 
    boxSizing: 'border-box'}}>
    <form onSubmit={addPost}>
    <Grid container spacing={3}>
    <Grid item xs={4}>
    <InputLabel>nom</InputLabel>

      <TextField
        

        id="ch1"
        placeholder={selectedDetail.fullname} // Utilisation en tant que placeholder

        //placeholder={selectedDetail.fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      </Grid>
      <Grid item xs={4}>
      <InputLabel>Prenom</InputLabel>

      <TextField
   

        id="ch2"
         
        fullWidth
        placeholder={selectedDetail.fPrenom}
        onChange={(e) => setfPrenom(e.target.value)}


      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Date de naissance</InputLabel>

            <TextField


              id="ch3"
              type="date"
              

              fullWidth
              value={selectedDetail.fNai}
              onChange={(e) => setfNai(e.target.value)}

              InputLabelProps={{
                shrink: true, // Le label restera toujours au-dessus de l'input
            }}
            InputProps={{
              inputProps: {
                pattern: '[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}',
              },
            }}

            />
            </Grid>

            <Grid item xs={4}>

              <FormControl   fullWidth>
                <InputLabel id="sex-label">Sexe</InputLabel>
                <Select
                  id="ch4"
                  value={selectedDetail.fSexe}
                  onChange={(e) => setfSexe(e.target.value)}
                  label="Sexe"
  

                   >
                  <MenuItem value="Femme">MMe</MenuItem>
                  <MenuItem value="Homme">Mr</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
              <InputLabel>Régime</InputLabel>

              <TextField
                

                id="ch5"                
                fullWidth
                placeholder={selectedDetail.fRegime}
                onChange={(e) => setfRegime(e.target.value)}


              />
                    </Grid>
            <Grid item xs={4}>


            <FormControl   fullWidth>
              <InputLabel id="situ-label">Situation</InputLabel>
              <Select
                labelId="situ-label"
                id="ch6"
                value={selectedDetail.fSitu || ''}
                onChange={(e) => setfSitu(e.target.value)}
                label="Situation"
        

              >
                <MenuItem value="célibataire">Célibataire</MenuItem>
                <MenuItem value="divorcé(e)">Divorcé(e)</MenuItem>
                <MenuItem value="Marié(e)">Marié(e)</MenuItem>
                <MenuItem value="Veuf(ve)">Veuf(ve)</MenuItem>
                <MenuItem value="Concubin(e)">Concubin(e)</MenuItem>
                <MenuItem value="Partenaire lié par un PACS*">Partenaire lié par un PACS*</MenuItem>
                <MenuItem value="total_prixcontracts">total_prixcontracts</MenuItem>

                </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4}>
                <InputLabel>Ville</InputLabel>

                <TextField
                  

                  id="ch7"
                  
                  fullWidth
                  placeholder={selectedDetail.fville}
                  onChange={(e) => setfville(e.target.value)}

                  //className={classes.noOutline}


                />
                      </Grid>
            <Grid item xs={4}>
            <InputLabel>Address</InputLabel>

              <TextField
                

                id="ch8"
                
                fullWidth
                placeholder={selectedDetail.fAdresse}
                onChange={(e) => setfAdresse(e.target.value)}

                //className={classes.noOutline}

              />
                    </Grid>

            <Grid item xs={4}>

            <InputLabel>Adresse optionel</InputLabel>

      <TextField
   

        id="ch9"
         
        fullWidth
        placeholder={selectedDetail.fAdresse2}
        onChange={(e) => setfAdresse2(e.target.value)}
        //className={classes.noOutline}


      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Code Postale</InputLabel>

      <TextField
   

        id="ch10"
         
        fullWidth
        placeholder={selectedDetail.fCpo}
        onChange={(e) => setfCpo(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Email</InputLabel>

      <TextField
   

        id="ch11"
        type="email"
         
        fullWidth
        placeholder={selectedDetail.fEmail}
        onChange={(e) => setfEmail(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Tél/Portable</InputLabel>

      <TextField
   

        id="ch12"
         
        fullWidth
        placeholder={selectedDetail.ftel}
        onChange={(e) => setftel(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Tél optionel</InputLabel>

      <TextField
   

        id="ch13"
         
        fullWidth
        placeholder={selectedDetail.ftel1}
        onChange={(e) => setftel1(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Catégorie professionnelle</InputLabel>

      <TextField
   

        id="ch14"
         
        fullWidth
        placeholder={selectedDetail.fprof}
        onChange={(e) => setfprof(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Activité</InputLabel>

      <TextField
   

        id="ch15"
         
        fullWidth
        placeholder={selectedDetail.factive}
        onChange={(e) => setfactive(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Ville de naissance</InputLabel>

<TextField
   

        id="ch16"
         
        fullWidth
        placeholder={selectedDetail.fvilN}
        onChange={(e) => setfvilN(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Pays de naissance</InputLabel>

      <TextField
   

        id="ch17"
         
        fullWidth
        placeholder={selectedDetail.fPays_de_naissance}
        onChange={(e) => setfPays_de_naissance(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Cp de naissance</InputLabel>

      <TextField
        

        id="ch18"
         
        fullWidth
        placeholder={selectedDetail.fCP}
        onChange={(e) => setfCP(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Complément</InputLabel>

      <TextField
   

        id="ch19"
         
        fullWidth
        placeholder={selectedDetail.fCom}
        onChange={(e) => setfCom(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>


            <FormControl   fullWidth>
        <InputLabel id="situ-label">Statut fiche</InputLabel>
        <Select
          labelId="situ-label"
          id="ch6"
          placeholder={selectedDetail.fstatut}
          onChange={(e) => setfstatut(e.target.value)}
          label="Statut fiche"
  

        >
          <MenuItem value="Leads sans signature">Leads sans signature</MenuItem>
          <MenuItem value="SQ a faire">SQ a faire</MenuItem>
          <MenuItem value="SQ PJ/DEP A faire)">SQ PJ/DEP A faire</MenuItem>
          <MenuItem value="SQ MUT a faire">SQ "MUT"a faire</MenuItem>
          <MenuItem value="SQ LCDA a faire">SQ "LCDA"a faire</MenuItem>
          <MenuItem value="SQ Non validée">SQ Non validée</MenuItem>
          <MenuItem value="SQ a validée">SQ a validée</MenuItem>
          <MenuItem value="SAP 3/3">SAP 3/3</MenuItem>
          <MenuItem value="SAP sans PJ">SAP sans PJ</MenuItem>
          <MenuItem value="Dossier PJ reçu">Dossier PJ reçu</MenuItem>
          <MenuItem value="X-Avocat SAP Mutuelle non complet">X-Avocat SAP Mutuelle non complet</MenuItem>
          <MenuItem value="V-Avocat SAP Mutuelle parrainé">V-Avocat SAP Mutuelle parrainé</MenuItem>
          <MenuItem value="Avocat">Avocat</MenuItem>
          {/* Ajoutez d'autres options ici si nécessaire */}
        </Select>
      </FormControl>
      </Grid>
</Grid>
      <br></br>


      <div>
            {selectedDetail.contrats.map((contrat, index) => (
                        <Card key={index} className={classes.card} elevation={3} >
                        <Typography variant="h6" className={classes.title}>
                        Assurance
                    </Typography>
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                    <Grid container spacing={3}>
            <Grid item xs={6}>
            <InputLabel>Société a résilier</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Société_a_résilier"
                    placeholder={contrat.Société_a_résilier}
                    onChange={(e) => handleChange(e, index)}
                    />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Type de Résiliation</InputLabel>

                <TextField
                      

                    fullWidth
                    name="Type_de_Résiliation"
                    placeholder={contrat.Type_de_Résiliation}
                    onChange={(e) => handleChange(e, index)}

                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Type de contrat</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Type_de_contrat"
                    placeholder={contrat.Type_de_contrat}
                    onChange={(e) => handleChange(e, index)}

                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Nom assurance</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Nom_assurance"
                    placeholder={contrat.Nom_assurance}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={6}>
            <InputLabel>Adress</InputLabel>

                <TextField
                     

                    fullWidth
                    name="Adresse"
                    placeholder={contrat.Adresse}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>N° contrat</InputLabel>

                <TextField
                    

                    fullWidth
                    name="N_contrat"
                    placeholder={contrat.N_contrat}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>N° SS</InputLabel>

                <TextField
                    

                    fullWidth
                    name="N_SS"
                    placeholder={contrat.N_SS}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Code postale</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Code_postale"
                    placeholder={contrat.Code_postale}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Ville</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Ville"
                    placeholder={contrat.Ville}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Nombre de contrats</InputLabel>

                <TextField
                   
                   type="number"
                    fullWidth
                    name="Nombre_de_contrat"
                    placeholder={contrat.Nombre_de_contrat.toString()}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={4}>
            <InputLabel>N° RAR</InputLabel>

                <TextField
                    

                    fullWidth
                    name="N_RAR"
                    placeholder={contrat.N_RAR}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            
            <Grid item xs={3}>
            <InputLabel>Date effet</InputLabel>

                <TextField
                    

                    fullWidth
                    name="Date_effet"
                    type="date"
                    value={contrat.Date_effet}
                    onChange={(e) => handleChange(e, index)}
                    InputLabelProps={{
                      shrink: true, // Le label restera toujours au-dessus de l'input
                  }}
                  InputProps={{
                    inputProps: {
                      pattern: '[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}',
                    },
                  }}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Date de résiliation</InputLabel>

            <TextField
                

                fullWidth
                name="Date_de_résiliation"
                type="date"
                value={contrat.Date_de_résiliation}
                onChange={(e) => handleChange(e, index)}
                InputLabelProps={{
                  shrink: true, // Le label restera toujours au-dessus de l'input
              }}
              InputProps={{
                inputProps: {
                  pattern: '[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}',
                },
              }}
                
            />
        </Grid>
                <Grid item xs={6}>
                <InputLabel>Commentaire</InputLabel>

                <TextField
                   

                    fullWidth
                    name="Commentaire"
                    placeholder={contrat.Commentaire}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
        </Grid>
                    </form>
                </Card>
            ))}
            

        </div>
                

        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                    valider
                </Button> 
                {isConfirmed && (
                    <div style={{ marginTop: '20px' }}>
                        <p>{successMessage}</p>
                        
                        
                    </div>
                )}
    </form>
    
  </Card>
    </BrowserRouter>

  );
};

Details.propTypes = {
};