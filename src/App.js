import logo from "./logo.svg";
import "./App.css";
import WeatherHeader from "./components/weatherHeader";
import { Grid, Button, Box, TextField, Typography, Divider, Paper } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import axios from "axios";
import {  useState } from "react";
import moment from 'moment';


function App() {
  const [latitude,setLattiude] = useState(null)
  const [grid,setGrid] = useState(null)
  const [title,setTitle] = useState({
    title:'',
    subTitle:''
  })
  const [mainWeatherDetail,setMaiweatherDetail]=useState({
    icon:"",
    mainTemp:"",
    temnpText:""

  })


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const fathData = async (longitude) => {
    try {
      const {data:mainData} = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=33c92b0552e0eea71460739025382726`
      );
      const wetherIconText = mainData.weather[0].icon || null
      var wetherIcon = ''


      
     setTitle({
       title: `${mainData.name}, ${mainData.sys.country}`,
       subTitle: moment.unix(mainData.dt).format("dddd DD MMMM"),
     });
     setMaiweatherDetail({
       icon: wetherIconText || "",
       mainTemp: mainData.main.temp || "",
       temnpText: mainData.weather[0].main || "",
     });
     setGrid({
      high:mainData.main.temp_max,
      wind:mainData.wind.speed,
      sunRise:moment.unix(mainData.sys.sunrise).format('HH:mm'),
      low:mainData.main.temp_min,
      rain:mainData.clouds.all,
      sunset: moment.unix(mainData.sys.sunset).format('HH:mm')
     })

     console.log(wetherIcon);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Box>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onChange={(e)=>{setLattiude(e.target.value)}}
              sx={{borderColor:"gold"}}
            />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onKeyDown={(e)=>{fathData(e.target.value)}}
              sx={{borderColor:"gold"}}

            />
            <Divider sx={{ marginTop: "10px" ,backgroundColor:"gold"}} />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Typography sx={{color:"white"}}>{title.title}</Typography>
              <Typography sx={{color:"white"}}>{title.subTitle}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{display:"flex" , flexDirection:"row"}}>
              <img src={`http://openweathermap.org/img/wn/${mainWeatherDetail.icon}@2x.png `} alt="Image Placeholder" />
              <Box>
                <Typography sx={{color:"white"}}>{`${mainWeatherDetail.mainTemp}`}</Typography>
                <Typography sx={{color:"white"}}>{`${mainWeatherDetail.temnpText}`}</Typography>
              </Box>
            </Box>



          </Grid>
          <Grid  item xs={6} >
            <Box  sx={{ flexGrow: 1 , borderLeft:"3px solid gray" }}>
              {grid &&
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.high}</Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.wind}</Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.sunRise}</Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.low}</Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.rain}</Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                  <Item>{grid.sunset}</Item>
                </Grid>
              </Grid>
               }
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
}

export default App;
