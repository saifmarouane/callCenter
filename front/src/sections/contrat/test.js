return (
    <Card >
      <form onSubmit={addPost} >
      <Grid container spacing={5}>
      <Grid item md={4}>
  
        <TextField
  
        required
  
        id="outlined-read-only-input"
        label="Nom"
          style={{
            width: '300px', // Custom width
            fontWeight: 'bold', // Custom font weight
          }}
          value={fullname}
          
          onChange={(e) => setFullname(e.target.value)}
        />
        </Grid>
        <Grid item md={4}>
  
        <TextField
     required
  
          id="ch2"
          label="Prenom"
           
          fullWidth
          value={fPrenom}
          onChange={(e) => setfPrenom(e.target.value)}
  
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
  
  
          id="ch3"
          label="Date de naissance"
          type="date"
          required
  
          fullWidth
          value={fNai}
          onChange={(e) => setfNai(e.target.value)}
  
          InputLabelProps={{
            shrink: true, // Le label restera toujours au-dessus de l'input
        }}
  
        />
              </Grid>
  
              <Grid item md={4}>
  
        <FormControl   fullWidth>
          <InputLabel id="sex-label">Sexe</InputLabel>
          <Select
            labelId="sex-label"
            id="ch4"
            value={fSexe}
            onChange={(e) => setfSexe(e.target.value)}
            label="Sexe"
    
  
          >
            <MenuItem value="Femme">Femme</MenuItem>
            <MenuItem value="Homme">Homme</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item md={4}>
  
        <TextField
     required
  
          id="ch5"
          label="Régime"
           
          fullWidth
          value={fRegime}
          onChange={(e) => setfRegime(e.target.value)}
  
  
        />
              </Grid>
              <Grid item md={4}>
  
  
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
            <MenuItem value="total_prixcontracts">total_prixcontracts</MenuItem>
  
            {/* Ajoutez d'autres options ici si nécessaire */}
          </Select>
        </FormControl>
        </Grid>
        <Grid item md={4}>
  
        <TextField
     required
  
          id="ch7"
          label="Ville"
           
          fullWidth
          value={fville}
          onChange={(e) => setfville(e.target.value)}
  
          //className={classes.noOutline}
  
  
        />
              </Grid>
              <Grid item md={4}>
  
        <TextField
     required
  
          id="ch8"
          label="Adresse"
           
          fullWidth
          value={fAdresse}
          onChange={(e) => setfAdresse(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
  
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch9"
          label="Adresse optionel"
           
          fullWidth
          value={fAdresse2}
          onChange={(e) => setfAdresse2(e.target.value)}
          //className={classes.noOutline}
  
  
        />
              </Grid>
  
              <Grid item md={4}>
  
        <TextField
     required
  
          id="ch10"
          label="Code Postal"
           
          fullWidth
          value={fCpo}
          onChange={(e) => setfCpo(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch11"
          label="Email"
          type="email"
           
          fullWidth
          value={fEmail}
          onChange={(e) => setfEmail(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch12"
          label="Tél/Portable"
           
          fullWidth
          value={ftel}
          onChange={(e) => setftel(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
  
              <Grid item md={4}>
  
        <TextField
     required
  
          id="ch13"
          label="Tél 1"
           
          fullWidth
          value={ftel1}
          onChange={(e) => setftel1(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch14"
          label="Catégorie professionnelle"
           
          fullWidth
          value={fprof}
          onChange={(e) => setfprof(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch15"
          label="Activité"
           
          fullWidth
          value={factive}
          onChange={(e) => setfactive(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
  <TextField
     required
  
          id="ch16"
          label="Ville de naissance"
           
          fullWidth
          value={fvilN}
          onChange={(e) => setfvilN(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
  
              <Grid item md={4}>
  
        <TextField
     required
  
          id="ch17"
          label="Pays de naissance"
           
          fullWidth
          value={fPays_de_naissance}
          onChange={(e) => setfPays_de_naissance(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
          required
  
          id="ch18"
          label="CP de naissance"
           
          fullWidth
          value={fCP}
          onChange={(e) => setfCP(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
        <TextField
     required
  
          id="ch19"
          label="Complément"
           
          fullWidth
          value={fCom}
          onChange={(e) => setfCom(e.target.value)}
  
          //className={classes.noOutline}
  
        />
              </Grid>
              <Grid item md={4}>
  
  
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
              <Grid item md={6}>
                  <TextField
     required
  
                      fullWidth
                      label="Société_a_résilier"
                      name="Société_a_résilier"
                      value={formData.Société_a_résilier}
                      onChange={(e) => handleChange(e, index)}
                      />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Type de Résiliation"
                      name="Type_de_Résiliation"
                      value={formData.Type_de_Résiliation}
                      onChange={(e) => handleChange(e, index)}
  
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Type contrat"
                      name="Type_de_contrat"
                      value={formData.Type_de_contrat}
                      onChange={(e) => handleChange(e, index)}
  
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Nom assurance"
                      name="Nom_assurance"
                      value={formData.Nom_assurance}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={6}>
                  <TextField
     required
  
                      fullWidth
                      label="Adresse"
                      name="Adresse"
                      value={formData.Adresse}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="N° contrat"
                      name="N_contrat"
                      value={formData.N_contrat}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="N° SS"
                      name="N_SS"
                      value={formData.N_SS}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Code postale"
                      name="Code_postale"
                      value={formData.Code_postale}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Ville"
                      name="Ville"
                      value={formData.Ville}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={3}>
                  <TextField
                     required
                     type="number"
                      fullWidth
                      label="Nombre de contrat"
                      name="Nombre_de_contrat"
                      value={formData.Nombre_de_contrat}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              <Grid item md={4}>
                  <TextField
     required
  
                      fullWidth
                      label="N° RAR"
                      name="N_RAR"
                      value={formData.N_RAR}
                      onChange={(e) => handleChange(e, index)}
                       
                  />
              </Grid>
              
              <Grid item md={3}>
                  <TextField
     required
  
                      fullWidth
                      label="Date effet"
                      name="Date_effet"
                      type="date"
                      value={formData.Date_effet}
                      onChange={(e) => handleChange(e, index)}
                      InputLabelProps={{
                        shrink: true, // Le label restera toujours au-dessus de l'input
                    }}
                       
                  />
              </Grid>
              <Grid item md={3}>
      <TextField
     required
  
          fullWidth
          label="Date de résiliation"
          name="Date_de_résiliation"
          type="date"
          value={formData.Date_de_résiliation}
          onChange={(e) => handleChange(e, index)}
          InputLabelProps={{
            shrink: true, // Le label restera toujours au-dessus de l'input
        }}
          
      />
  </Grid>
  <Grid item md={6}>
                  <TextField
     required
  
                      fullWidth
                      label="Commentaire"
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
                          
                          <Button onClick={() => {setIsConfirmed(false),handleGeneratePDF()}}
                      
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