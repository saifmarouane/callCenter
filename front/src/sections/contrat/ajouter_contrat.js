import { useState } from "react"
import { createFormData,readFormData,updateFormData,deleteFormData } from './formcrud';
import PropTypes from 'prop-types';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import React from 'react';
import {   Button, FormControl, InputLabel, Select, MenuItem,makeStyles } from '@material-ui/core';
import {  Container, SvgIcon } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// ... (le reste de votre code)
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
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' // Ombre portée ajoutée ici

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
import { format } from 'date-fns';
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


  

export const Addpost = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => {},
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = []
      } = props;
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const username=user.username
    const [fullname,setFullname] = useState("");
    const [fPrenom,setfPrenom] = useState("");
    const [fSexe,setfSexe] = useState("");
    const [fNai,setfNai] = useState("");
    const [fRegime,setfRegime] = useState("");
    const [fSitu,setfSitu] = useState("");
    const [fville,setfville] = useState("");
    const [fAdresse,setfAdresse] = useState("");
    const [fAdresse2,setfAdresse2] = useState("");
    const [fCpo,setfCpo] = useState("");
    const [fEmail,setfEmail] = useState("");
    const [ftel,setftel] = useState("");
    const [ftel1,setftel1] = useState("");
    const [factive,setfactive] = useState("");
    const [fprof,setfprof] = useState("");
    const [fPays_de_naissance,setfPays_de_naissance] = useState("");
    const [fvilN,setfvilN] = useState("");
    const [fCP,setfCP] = useState("");
    const [fCom,setfCom] = useState("");
    const [fstatut,setfstatut] = useState("");
    const [total_nbr_contacts,settotal_nbr_contacts] = useState();
    var [total_prixcontracts,settotal_prixcontracts] = useState();

    
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const data={

    }
    function addPost(event) {

      const convertDate = (dateString) => {
        return dateString.split('-').reverse().join('/');
      };

     const post = {
      username,
      fullname,
      fPrenom,
      fNai: convertDate(fNai), // Convertissez la date ici
      
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
      fstatut,
      
      contrats,
     } 
     event.preventDefault(); // Empêche le rechargement de la page

     console.log("data",post)
     axios.post('http://localhost:8000/auth/userforms/', post)
     .then(response => {
         window.sessionStorage.setItem('response', JSON.stringify(response.data));

         

         setIsConfirmed(true);
         setSuccessMessage("Les informations ont été créées avec succès!");
     })
     .catch(error => {
         console.error('Erreur lors de l\'envoi des données:', error);
         alert('Erreur lors de l\'envoi des données:verifiez les informations')
         setIsConfirmed(false);
         setSuccessMessage("");
     });
     


     
    }

      //------------ WORK WITH API -------------//
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
            Nombre_de_contrat:1,
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

    const handleChange = (e, index) => {
      event.preventDefault(); // Empêche le rechargement de la page

      const { name, value } = e.target;
      const updatedForms = [...contrats];
  
      // Vérifiez si l'index est valide
      if (updatedForms[index]) {
          updatedForms[index][name] = value;
          setcontrats(updatedForms);
     } else {
      }
  };
  

  

    const handleSubmit = (e, index) => {
        event.preventDefault(); // Empêche le rechargement de la page
 
        e.preventDefault();
    };
    const deleteForm = (indexToDelete) => {
      setcontrats(prevcontrats => {
          // Filtrer et retourner les données du formulaire sans l'élément à supprimer

          return prevcontrats.filter((_, index) => index !== indexToDelete);
      });
  };
  

  //imprimer:
 


  ////////////////////////////////////////////////////////////////handel 1////
 

  const handleGenerate1PDF = () => {
    const getResponse = JSON.parse(window.sessionStorage.getItem('response'));

    const pdf = new jsPDF('p', 'mm', 'a4'); // Standard A4 size
    pdf.setFontSize(12);
  
    // Page content
    pdf.text(90, 20, 'SERVICE A LA PERSONNE ADHÉSION N°:11002');
  
    // Personal information section
    pdf.text(50, 30, `Coordonnées de l'adhérant:`);
    pdf.text(20, 35, `Prénom: ${fPrenom},     Nom : ${fullname}`);
    pdf.text(20, 40, `Date de Naissance: ${fNai}`);
    pdf.text(20, 45, `Situation Familiale: ${fSitu}`);
    pdf.text(20, 50, `Adresse: ${fAdresse}`);
    pdf.text(20, 55, `Code Postal: ${fCpo}`);
    pdf.text(20, 60, `Ville: ${fville}`);
    pdf.text(20, 65, `Téléphone: ${ftel}`);
    pdf.text(20, 70, `Email: ${fEmail}`);
  
    // Table headers
    const columns = ["Société à résilier", "Type de contrat", "Nombre de contrat", "N° contrat", "N° SS"];
    
    // Table data
    const data = contrats.map((rowData) => [
      rowData.Société_a_résilier,
      rowData.Type_de_contrat,
      rowData.Nombre_de_contrat,
      rowData.N_contrat,
      rowData.N_SS
    ]);
    
    // Position of the table
    let tableY = 80;
  
    // Table options
    const tableOptions = {
      startY: tableY,
      head: [columns],
      body: data,
      theme: 'grid', // Simple grid theme
      margin: { top: 10 },
    };
  
    // Generate the table
    var fontSize = 4;

    pdf.autoTable(tableOptions);
  
    // Additional text
    pdf.text(20, pdf.autoTable.previous.finalY + 10, `Chaque contrat est facturé à 40 Euros.`);
    pdf.text(20, pdf.autoTable.previous.finalY + 15, `Frais de Dossier: 20.00 €`);
    pdf.text(20, pdf.autoTable.previous.finalY + 20, `Nombre de lettre facturée: ${getResponse.total_nbr_contracts}`);
    pdf.text(20, pdf.autoTable.previous.finalY + 25, `Montant unique à régler: ${getResponse.total_prixcontracts} €`);
    pdf.text(10, pdf.autoTable.previous.finalY + 55, `[*]Je reconnais avoir transmis des informations exactes afin que TSA Assurances puisse renoncer à mon\ncontrat ou / mes contrats.\n(Nom de Compagnie–Reference De Contrat-Numéro De Sécurité Sociale- Date D’échéance)ci-dessus.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 70, `[*]Je certifie n’être ni sous tutelle ni sous curatelle.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 75, `[*]TSA Assurances ne sera en en aucun cas responsable si j’obtiens un de refus de radiation.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 80, `[*]En cas de rejet du prélèvement,un second prélèvement sera effectué.Si ce nouveau prélèvement est à\nnouveau rejeté,le contrat sera suspendu et des frais de prélèvements rejetés me seront réclamés.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 90, `[*]Je reconnais avoir signé électroniquement les documents de souscription(le bulletin d’adhésion\naccompagné de la notice d’information valant Conditions Générales,le mandat de délégation et que\nces documents me seront opposables,au même titre que s’ils avaient été signés de ma main.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 105, `[*]J’atteste avoir reçu un exemplaire de la notice d’information valant Conditions Générales,\nde la fiche d’information normalisée du produit d’assurance et de la fiche d’information et de conseil.`);
    pdf.text(10, pdf.autoTable.previous.finalY + 115, `[*]cochant cette case,j’accepte de recevoir des mails de la part de TSA Assurances et de ses partenaires.`);
    // Function to add text to the PDF and handle line breaks
    
    pdf.save('mandat_delegation.pdf');
  };
  


  //  ////////////////////////////////////////////////////////////////handel 2////

 const handleGenerate2PDF = () => {
  const pdf = new jsPDF();
  pdf.setFontSize(10);

  // Regular font and color
  pdf.setFontSize(12); 
  pdf.text(20, 40, 'Objet : Mandat de délégation');
  pdf.text(20, 60, 'Madame, Monsieur,');
  pdf.text(20, 70, `Je soussigné(e)      ${fullname}      ${fPrenom},`);
  pdf.text(20, 80, `demeurant        ${fAdresse},       ${fCpo},${fville}`);
  pdf.text(20, 90, 'donne mandat à TSA Assurances, pour agir en mon nom et pour mon compte afin de');
  pdf.text(20, 100, 'résilier/renoncer ou réclamer mes contrat(s) ou abonnement(s).');
  pdf.text(20, 120, `Fait à      ${fville},    le   ${contrats[0].Date_de_résiliation}`);
  pdf.text(20, 130, 'Bon pour mandat');
  pdf.save('mandat_delegation1.pdf');
};




    ////////////////////////////////////////////////////////////////handel 3////
    const handleGenerate3PDF = () => {
      const pdf = new jsPDF();

      contrats.forEach(contrat => {
        console.log("Nom de l'assurance:", contrat.Nom_assurance);
        const pdf = new jsPDF();
        pdf.setFontSize(9);

        // Add data to the PDF
        pdf.text(130, 20, `${contrat.Société_a_résilier}`);
        pdf.text(130, 30, `${contrat.Adresse}`);
        pdf.text(130, 40, `${contrat.Code_postale}, ${contrat.Ville}`);
        pdf.text(130, 50, `${contrat.Date_de_résiliation}`);
        pdf.text(20, 60, 'LETTRE RECOMMANDEE AVEC ACCUSE DE RECEPTION');
        pdf.text(20, 70, `PJ : Un mandat de délégation signé par MME ${fullname}, ${fPrenom} nous autorisant à envoyer ce courrier en son nom.`);
        pdf.text(20, 76, 'Objet : RECLAMATION de mon Contrat suite à un Démarchage Abusif.');
        pdf.text(20, 80, 'Madame, Monsieur,');
        pdf.text(20, 86, 'Par la présente lettre recommandée avec accusé de réception, nous vous informons que nous sommes mandatés\n par domicilié(e) :');
        pdf.text(80, 93, `${fAdresse}, ${fCpo}, ${fvilN}`);
        pdf.text(80, 100, `${fCpo}, ${fvilN}`);
        pdf.text(80, 107, `Date de naissance : ${fNai}`);
        pdf.text(80, 114, `N° SS : ${contrat.N_SS} / N° Contrat: ${contrat.N_contrat}`);
        pdf.text(20, 124, 'Afin de résilier et d\'annuler IMMEDIATEMENT ET SANS DELAI tous les contrats d\'assurances enregistrés en son nom auprès \n de votre société dès réception de cette Mise en Demeure.');
        pdf.text(20, 134, `Nous sommes contraints de vous écrire afin de vous informer que MME ${fullname}, ${fPrenom} souhaite annuler la vente de services \n que vous  lui avez proposé par téléphone.  En effet, MME ${fullname}, ${fPrenom} s'est rendu(e) compte qu'il/elle n'avait pas besoin de\n ces services et qu\'il/elle n\'était pas satisfait(e) des conditions du contrat.`);
        pdf.text(20, 146, `MME ${fullname}, ${fPrenom} s'est rendu(e) compte qu\'il/elle n'avait ni le besoin ni l'utilité  de tous ces services et qu'il/elle ne\n s'attendait pas  du tout à ces montants au regard de ses dépenses passées`);
        pdf.text(20, 154, `MME ${fullname}, ${fPrenom} a été démarché(e) par téléphone abusivement par plusieurs compagnies d'assurances dont la vôtre\n avec qui il a souscrit sans en avoir conscience de multiples contrats dont il/elle n\'a aucune utilité.`);
        pdf.text(20, 164, `MME ${fullname}, ${fPrenom}se retrouve aujourd'hui à devoir payer de nombreux prélèvements de différentes \n assurances pour un montant exorbitant sans aucune mesure avec ses revenus !`);
        pdf.text(20, 174, 'En vertu de l\'article L.133-25 du Code Monétaire et Financier je vous mets en demeure par la présente \n de bien vouloir cesser tous prélèvements et de lui rembourser toutes les sommes indument perçues.');
        pdf.text(20, 184, 'A défaut de réponse SOUS HUIT JOURS nous serons contraint de saisir le Médiateur et d\'engager toutes les poursuites \n judiciaires nécessaires afin de défendre ses droits et de voir réparer les graves préjudices subis.');
        pdf.text(20, 194, 'Dans l\'attente du plaisir de vous lire, je vous prie de croire\, Madame\, Monsieur,\à l\'assurance de nos salutations distinguées.');
        pdf.text(20, 204, 'TSA Assurances');
        pdf.text(20, 214, '(Courrier signé numériquement )');
        pdf.text(20, 224, 'N° : 11002');
        
        // Enregistrez le PDF
        pdf.save(`${contrat.Société_a_résilier}.pdf`);
      });
    };
  //////
    
    

  

return (
  <Card style={{ 
    padding: '5px', 
 
    margin: '2rem', 
    boxSizing: 'border-box'}}>
    <form onSubmit={addPost} >
    <Grid container spacing={3}>
    <Grid item xs={4}>
    <InputLabel>nom</InputLabel>

      <TextField
        required

        id="ch1"
        
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      </Grid>
      <Grid item xs={4}>
      <InputLabel>Prenom</InputLabel>

      <TextField
   required

        id="ch2"
         
        fullWidth
        value={fPrenom}
        onChange={(e) => setfPrenom(e.target.value)}


      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Date de naissance</InputLabel>

            <TextField
              id="ch3"
              type="date"
              required
              fullWidth
              value={fNai}
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
                  value={fSexe}
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
                required

                id="ch5"                
                fullWidth
                value={fRegime}
                onChange={(e) => setfRegime(e.target.value)}


              />
                    </Grid>
            <Grid item xs={4}>


            <FormControl   fullWidth>
              <InputLabel id="situ-label">Situation</InputLabel>
              <Select
                labelId="situ-label"
                id="ch6"
                value={fSitu}
                onChange={(e) => setfSitu(e.target.value)}
                label="Situation"
        

              >
                <MenuItem value="célibataire">Célibataire</MenuItem>
                <MenuItem value="divorcé(e)">Divorcé(e)</MenuItem>
                <MenuItem value="Marié(e)">Marié(e)</MenuItem>
                <MenuItem value="Veuf(ve)">Veuf(ve)</MenuItem>
                <MenuItem value="Concubin(e)">Concubin(e)</MenuItem>
                <MenuItem value="Partenaire lié par un PACS*">Partenaire lié par un PACS*</MenuItem>

                </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4}>
                <InputLabel>Ville</InputLabel>

                <TextField
                  required

                  id="ch7"
                  
                  fullWidth
                  value={fville}
                  onChange={(e) => setfville(e.target.value)}

                  //className={classes.noOutline}


                />
                      </Grid>
            <Grid item xs={4}>
            <InputLabel>Address</InputLabel>

              <TextField
                required

                id="ch8"
                
                fullWidth
                value={fAdresse}
                onChange={(e) => setfAdresse(e.target.value)}

                //className={classes.noOutline}

              />
                    </Grid>

            <Grid item xs={4}>

            <InputLabel>Adresse optionel</InputLabel>

      <TextField
   required

        id="ch9"
         
        fullWidth
        value={fAdresse2}
        onChange={(e) => setfAdresse2(e.target.value)}
        //className={classes.noOutline}


      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Code Postale</InputLabel>

      <TextField
   required

        id="ch10"
         
        fullWidth
        value={fCpo}
        onChange={(e) => setfCpo(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Email</InputLabel>

      <TextField
   required

        id="ch11"
        type="email"
         
        fullWidth
        value={fEmail}
        onChange={(e) => setfEmail(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Tél/Portable</InputLabel>

      <TextField
   required

        id="ch12"
         
        fullWidth
        value={ftel}
        onChange={(e) => setftel(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Tél optionel</InputLabel>

      <TextField
   required

        id="ch13"
         
        fullWidth
        value={ftel1}
        onChange={(e) => setftel1(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Catégorie professionnelle</InputLabel>

      <TextField
   required

        id="ch14"
         
        fullWidth
        value={fprof}
        onChange={(e) => setfprof(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Activité</InputLabel>

      <TextField
   required

        id="ch15"
         
        fullWidth
        value={factive}
        onChange={(e) => setfactive(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Ville de naissance</InputLabel>

<TextField
   required

        id="ch16"
         
        fullWidth
        value={fvilN}
        onChange={(e) => setfvilN(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>

            <Grid item xs={4}>
            <InputLabel>Pays de naissance</InputLabel>

      <TextField
   required

        id="ch17"
         
        fullWidth
        value={fPays_de_naissance}
        onChange={(e) => setfPays_de_naissance(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Cp de naissance</InputLabel>

      <TextField
        required

        id="ch18"
         
        fullWidth
        value={fCP}
        onChange={(e) => setfCP(e.target.value)}

        //className={classes.noOutline}

      />
            </Grid>
            <Grid item xs={4}>

            <InputLabel>Complément</InputLabel>

      <TextField
   required

        id="ch19"
         
        fullWidth
        value={fCom}
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
          value={fstatut}
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
            {contrats.map((formData, index) => (
                        <Card key={index} className={classes.card} elevation={3} >
                        <Typography variant="h6" className={classes.title}>
                        Assurance
                    </Typography>
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                    <Grid container spacing={3}>
            <Grid item xs={6}>
            <InputLabel>Société a résilier</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Société_a_résilier"
                    value={formData.Société_a_résilier}
                    onChange={(e) => handleChange(e, index)}
                    />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Type de Résiliation</InputLabel>

                <TextField
                      required

                    fullWidth
                    name="Type_de_Résiliation"
                    value={formData.Type_de_Résiliation}
                    onChange={(e) => handleChange(e, index)}

                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Type de contrat</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Type_de_contrat"
                    value={formData.Type_de_contrat}
                    onChange={(e) => handleChange(e, index)}

                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Nom assurance</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Nom_assurance"
                    value={formData.Nom_assurance}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={6}>
            <InputLabel>Adress</InputLabel>

                <TextField
                     required

                    fullWidth
                    name="Adresse"
                    value={formData.Adresse}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>N° contrat</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="N_contrat"
                    value={formData.N_contrat}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>N° SS</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="N_SS"
                    value={formData.N_SS}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Code postale</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Code_postale"
                    value={formData.Code_postale}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Ville</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Ville"
                    value={formData.Ville}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={3}>
            <InputLabel>Nombre de contrats</InputLabel>

                <TextField
                   required
                   type="number"
                    fullWidth
                    name="Nombre_de_contrat"
                    value={formData.Nombre_de_contrat}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            <Grid item xs={4}>
            <InputLabel>N° RAR</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="N_RAR"
                    value={formData.N_RAR}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
            
            <Grid item xs={3}>
            <InputLabel>Date effet</InputLabel>

                <TextField
                    required

                    fullWidth
                    name="Date_effet"
                    type="text"
                    value={formData.Date_effet}
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
                required

                fullWidth
                name="Date_de_résiliation"
                type="text"
                value={formData.Date_de_résiliation}
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
                   required

                    fullWidth
                    name="Commentaire"
                    value={formData.Commentaire}
                    onChange={(e) => handleChange(e, index)}
                     
                />
            </Grid>
        </Grid>
                    </form>
                </Card>
            ))}
            <Button variant="contained" color="secondary" onClick={addForm}>
                Ajouter un nouveau 
            </Button>

        </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                    valider
                </Button>

                {isConfirmed && (
                    <div style={{ marginTop: '20px' }}>
                        <p>{successMessage}</p>
                        
                        <Button onClick={() => {setIsConfirmed(false),handleGenerate1PDF(),handleGenerate2PDF(),handleGenerate3PDF()}}
                    
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                    </div>
                )}
    </form>
  </Card>
);

// ... (le reste du code précédent)

    };
    
   
    
    Addpost.propTypes = {

    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
  };
  