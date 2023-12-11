
import { Container, Typography, Grid, Box, Link } from '@mui/material';
import { StyledFooter, Footerbg } from '../../style/style';
const Footer = () => {
    return (
        <Footerbg>
            <Container maxWidth="xl">
                <>
                    < StyledFooter>
                        <Typography variant="h6" >
                            © {new Date().getFullYear()} Your Website Name
                        </Typography>

                        <Typography variant="subtitle1" >
                            Powered by: <Link color="#fff" href="#">Coders Emon</Link>
                        </Typography>


                    </StyledFooter>
                </>
            </Container>
        </Footerbg >
    );
};

export default Footer;
