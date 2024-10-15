import React from 'react';
import { TextField, Button, Select, Grid, Typography, InputLabel, MenuItem, FormControl } from '@mui/material';
import { useState } from 'react';

const styles = {
  formGroup: {
    margin: '20px', // Espace entre les groupes
  },
  container: {
    backgroundColor: '#fff', // Couleur de fond blanche
   
  },
};

const modifierPage = () => {
  // État local pour stocker les données du formulaire de modification
  const [formData, setFormData] = useState({
    agenId: '',
    fullname: '',
    fPrenom: '',
    fNai: '',
    fsexe: '',
    fRegime: '',
    fSitu: '',
    fville: '',
    fAdresse: '',
    fAdresse2: '',
    fCpo: '',
    femail: '',
    ftel: '',
    tel: '',
    fprof: '',
    fvilN: '',
    fCP: '',
    fCom: '',
    // Ajoutez d'autres champs du formulaire ici
  });

  // Fonction pour gérer les changements dans le formulaire de modification
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire de modification
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez la logique pour traiter la soumission du formulaire ici
    console.log('Données soumises:', formData);
  };

  const addPost = () => {
    // Ajoutez votre logique spécifique ici
    console.log('Button clicked - addPost');
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={styles.container}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Page de Modification
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={styles.formGroup}>
                <InputLabel htmlFor="fullname"> Nom:</InputLabel>
                <TextField id="fullname" size="small" type="text" value={formData.fullname} onChange={handleInputChange} name="fullname" />
                
                <InputLabel htmlFor="fPrenom"> Prenom:</InputLabel>
                <TextField size="small" id='fPrenom' type="text" value={formData.fPrenom} onChange={handleInputChange} name="fPrenom" />
                
                <InputLabel htmlFor="date nai"  > Date de naissance:</InputLabel>
                <TextField id="date nai" size="small" type="Date" value={formData.fNai} onChange={handleInputChange} name="fNai" />
                
                <InputLabel htmlFor="sexe">Sexe:</InputLabel>
                <select value={formData.fsexe} id='sexe' onChange={handleInputChange} name="fsexe">
                  <option>Femme </option>
                  <option>Homme</option>        
                </select>
                
                <InputLabel htmlFor='regime' > Régime:</InputLabel>
                <TextField id='regime' size="small" type="text" value={formData.fRegime} onChange={handleInputChange} name="fRegime" />
                
                <InputLabel htmlFor='situation' >Situation:</InputLabel>
                <select id='situation' value={formData.fSitu} onChange={handleInputChange} name="fSitu">
                  <option>Célibataire</option>
                  <option>Divorcé(e)</option>
                  <option>Marié(e)</option>
                  <option>Veuf(ve)</option>
                  <option>Concubin(e)</option>
                  <option>Partenaire lié par un PACS*</option>
                </select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={styles.formGroup}>
                <InputLabel htmlFor="fville"> Ville:</InputLabel>
                <TextField id='fville' size="small" type="text" value={formData.fville} onChange={handleInputChange} name="fville" />
                
                <InputLabel htmlFor="fAdresse"> Adresse:</InputLabel>
                <TextField size="small" id='fAdresse' type="text" value={formData.fAdresse} onChange={handleInputChange} name="fAdresse" />
                
                <InputLabel htmlFor="fAdresse2"> Adresse2:</InputLabel>
                <TextField size="small" id='fAdresse2' type="text" value={formData.fAdresse2} onChange={handleInputChange} name="fAdresse2" />
                
                <InputLabel htmlFor="fCpo"> Code postal:</InputLabel>
                <TextField size="small" id='fCpo' type="text" value={formData.fCpo} onChange={handleInputChange} name="fCpo" />
                
                <InputLabel htmlFor="femail"> Email:</InputLabel>
                <TextField size="small" id='femail' type="email" value={formData.femail} onChange={handleInputChange} name="femail" />
                
                <InputLabel htmlFor="tel"> Tél/port:</InputLabel>
                <TextField size="small" id='tel' type="tel" value={formData.tel} onChange={handleInputChange} name="tel" />
                
                <InputLabel htmlFor="ftel"> Tél1:</InputLabel>
                <TextField size="small" id='ftel' type="tel1" value={formData.ftel} name="ftel" />
                
                <InputLabel htmlFor="fprof"> Catégorie prof:</InputLabel>
                <TextField size="small" id='fprof' type="text" value={formData.fprof} name="fprof" />
                
                <InputLabel htmlFor="factive"> Activité:</InputLabel>
                <TextField size="small" id='factive' type="text" value={formData.factive} onChange={handleInputChange} name="factive" />
                
                <InputLabel htmlFor="fvilN"> Ville de naissance:</InputLabel>
                <TextField size="small" id='fvilN' type="text" value={formData.fvilN} onChange={handleInputChange} name="fvilN" />
                
                <InputLabel htmlFor="fPN"> Pays de naissance:</InputLabel>
                <TextField size="small" id='fPN' type="text" value={formData.fPN} onChange={handleInputChange} name="fPN" style={{ width: '300px', fontSize: '16px' }} />
                
                <InputLabel htmlFor="Société_à_résilier"> Société à résilier:</InputLabel>
                <TextField size="small" id='Société_à_résilier' type="text" value={formData.Société_à_résilier} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Nom_assurance"> Nom de assurance:</InputLabel>
                <TextField size="small" id='Nom_assurance' type="text" value={formData.Nom_assurance} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Code_postal"> Code postal:</InputLabel>
                <TextField size="small" id='Code_postal' type="text" value={formData.Code_postal} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Adresse"> Adresse:</InputLabel>
                <TextField size="small" id='Adresse' type="text" value={Adresse.fCP} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Ville"> Ville:</InputLabel>
                <TextField size="small" id='Ville' type="text" value={formData.Ville} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="fCP"> Type de Résiliation :</InputLabel>
                <TextField size="small" id='Type_de_Résiliation' type="text" value={formData.Type_de_Résiliation} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Type_de_Résiliation"> Type de contrat:</InputLabel>
                <TextField size="small" id='Type_de_contrat' type="text" value={formData.Type_de_contrat} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="N_contrat">  N°contrat:</InputLabel>
                <TextField size="small" id='N_contrat' type="text" value={formData.N_contrat} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="fCP"> N°SS:</InputLabel>
                <TextField size="small" id='N_SS' type="text" value={formData.N_SS} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Nombre_de_contrat"> Nombre de contrat:</InputLabel>
                <TextField size="small" id='Nombre_de_contrat' type="text" value={formData.Nombre_de_contrat} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor=" N_RAR ">  N°RAR :</InputLabel>
                <TextField size="small" id=' N_RAR ' type="text" value={formData. N_RAR } onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Date_effet">Date effet:</InputLabel>
                <TextField size="small" id='Date_effet' type="text" value={Date_effet.Nombre_de_contrat} onChange={handleInputChange} name=""/>
                <InputLabel htmlFor="Date_de_rèsiliation">Date de rèsiliation:</InputLabel>
                <TextField size="small" id='Date_de_rèsiliation' type="text" value={formData.Date_de_rèsiliation} onChange={handleInputChange} name=""/>
            </FormControl>
              </Grid>
              </Grid>
              </form>
              </Grid>
      
              </Grid>
              
  )
}
export default modifierPage;