import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Tabs,
} from '@mui/material';
//import { useAuth } from '../../ src/hooks/use-auth';  // Assurez-vous que ce chemin est correct
import { useAuth } from '../../hooks/use-auth';  // Assurez-vous que ce chemin est correct

import { Layout as AuthLayout } from '../../layouts/auth/layout'

const Page = () => {
  const router = useRouter();
  const auth = useAuth();  // Assurez-vous que useAuth est correctement défini
  const [method, setMethod] = useState('email');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string()
        .min(8)
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await auth.signIn(values.email, values.password);
        // Gérez la réponse ou la redirection ici si nécessaire
      } catch (err) {
        console.error(err);
        helpers.setErrors({ submit: err.message });
      }
    },
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>Login |</title>
      </Head>
      <Box sx={{ backgroundColor: 'background.paper', flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 550, px: 3, py: '100px', width: '100%' }}>
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: -2 }} value={method}>
              {/* Ajoutez des onglets si nécessaire à l'avenir */}
            </Tabs>
            {method === 'email' && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>{page}</AuthLayout>
);

export default Page;
