import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: ["IBM3"],
	},
});
function App() {
  return (
    
    <div className="App">
      <ThemeProvider theme={theme}> 
        <Container maxWidth="xl">
        <MainComponent/>
      </Container>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
