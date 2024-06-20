import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundImage = styled('img')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.7,
});

const StyledButton = styled(Button)({
  backgroundColor: '#000',
  color: '#00d5fa',
  padding: '13px 24px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '16px',
  border: 'none',
  cursor: 'pointer',
});

const Image = styled('img')({
  borderRadius: '50%',
  border: '4px solid white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
});

const AdminDashboard = () => {
  return (
    <Box sx={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#1e3a8a', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <BackgroundImage
        src="https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/4088896/cover_image/retina_1708x683/cover-lyft-vs-uber-775ea9e308fa9960a942bebca7a2ea0e.png"
        alt="Background image of a network and a mobile phone in a person's hand"
      />
      
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <AppBar position="static" sx={{ backgroundColor: '#282828' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ color: '#00d5fa', fontWeight: 'bold' }}>
              Book My Ride
            </Typography>
            <Box sx={{ display: 'flex', gap: '32px', color: 'white', fontSize: '1.125rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Offering</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Find Ride</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About Us</a>
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '64px 32px' }}>
          <Box sx={{ color: 'white', maxWidth: '50%' }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: 'Sans-serif' }}>Share a Ride</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Sans-serif' }}>Ride for a Cause - Volunteer Today</Typography>
            <StyledButton>
              Book your Ride
            </StyledButton>
          </Box>
          <Box sx={{ position: 'relative', width: '400px', height: '400px' }}>
            <Image
              src="https://rapidsos.com/wp-content/uploads/2020/06/Ride-Sharing-Safety-1.png"
              alt="Central image"
              sx={{ top: '0', left: '0', width: '100%', height: '1200px' }}
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMOmwjhdlcb9Ky9coZ1q2Q9NPfEwYROm4zGdnEqMuQiL0FkJCr5lPEe2Oy1GHmJ_uT4M&usqp=CAU//150x150"
              alt="Top left image"
              sx={{ top: '-30px', left: '-10px', width: '37.5%', height: '40%' }}
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4ej9R7CzFI-L2l1qUFSO022Ub1zJajTNYv3hso5rykihXA_nFLi-g6yjUPPr4loh1z0&usqp=CAU/150x150"
              alt="Top right image"
              sx={{ top: '-30px', right: '-10px', width: '37.5%', height: '40%' }}
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH1nyd2Q_QfuC5lKHaW33QdmVhZCSr4fSIOw&s/150x150"
              alt="Bottom left image"
              sx={{ bottom: '-30px', left: '-10px', width: '37.5%', height: '40%' }}
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85z9YVkwGmcKvLE2xheHjjRkvwSzgxNdeJA&s/150x150"
              alt="Bottom right image"
              sx={{ bottom: '-30px', right: '-10px', width: '37.5%', height: '40%' }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;