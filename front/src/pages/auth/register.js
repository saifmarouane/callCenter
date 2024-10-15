import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/auth-context';
import { Button, TextField, Typography, Container, Box, Alert ,SvgIcon} from '@mui/material';

export const Register = () => {
  const { signUp } = useAuthContext();

  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is_admin, setIsAdmin] = useState('');

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      
      await signUp(email, first_name,last_name, password,is_admin);
      setIsConfirmed(true);

      setSuccessMessage("Agent créé avec succès!");

      // Rediriger vers une autre page ou effectuer une autre action si nécessaire
    } catch (err) {
      setError(err.message);
      setIsConfirmed(false);

      setSuccessMessage("verifiez les informations!");

    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ajouter un agent
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="prenom"
            autoComplete="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="nom"
            autoComplete="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mot de passe"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ajouter
          </Button>
          {isConfirmed && (
                    <div style={{ marginTop: '20px' }}>
                        <p>{successMessage}</p>
                        
                        
                    </div>
                )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
