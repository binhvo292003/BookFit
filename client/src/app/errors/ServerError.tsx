import { Container, Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ServerError() {
    const { state } = useLocation();
    console.log(state); // Log the state object to debug

    return (
        <Container component={Paper}>
            <Typography gutterBottom variant="h5">
                Server Error
            </Typography>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" color="secondary">
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">
                        {state.error.detail || 'Internal server error'}
                    </Typography>
                </>
            ) : (
                <Typography gutterBottom variant="h5">
                    Server Error
                </Typography>
            )}
        </Container>
    );
}
