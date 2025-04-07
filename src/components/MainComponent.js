import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardPray from './CardPray';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios"
import { useState, useEffect } from 'react';
import moment from 'moment';
import "moment/dist/locale/ar-dz"; 
moment.locale("ar"); 

export default function MainComponent() {
    const [time, setTime] = useState({
        Fajr: "04:42",
        Sunrise: "06:08",
        Dhuhr: "12:04",
        Asr: "15:28",
        Sunset: "18:01",
        Maghrib: "18:01",
        Isha: "19:18",
        Imsak: "04:32",
        Midnight: "00:05",
        Firstthird: "22:03",
        Lastthird: "02:06"
    });
    const avaliableCity = [
        {
            displayName: "الفيوم",
            apiName: "fayoum"
        },
        {
            displayName: "القاهرة",
            apiName: "Cairo"
        },
        {
            displayName: "الاسكندريه",
            apiName: "alexandria"
        }
    ]
    const [remainingTimeState, setRemainingTime] = useState("");
    const [nextPrayer,setNextPrayer]=useState(1);
    const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];

    const [city, setCity] = useState({
        displayName: "اسكندرية",
        apiName: "Alexandria"
    });
    const [timer,setTimer]=useState()

    const [today,setToday]=useState("")
    const handleCityName = ((event) => {
        const cityobject=avaliableCity.find((city)=>{
            return city.apiName===event.target.value;
        })
        setCity(cityobject);
    })
    const getTimings = async () => {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city.apiName}`);
        setTime(response.data.data.timings)
    }

    useEffect(() => {
        getTimings();
    }, [city])

    useEffect(()=>{
        const interval=setInterval(()=>{
        setupDownTime()
        },1000)

        const t=moment();
        setToday(t.format("MMM Do YYYY | h:mm ")); 
        return ()=> clearInterval(interval);
    },[time])

    const setupDownTime =()=>{
        const currentMoment=moment();
        let prayerIndex=1;
        if(currentMoment.isAfter(moment(time['Fajr'],'hh:mm')) && currentMoment.isBefore(moment(time['Dhuhr'],'hh:mm'))){
            prayerIndex=1;
        }else if(currentMoment.isAfter(moment(time['Dhuhr'],'hh:mm')) && currentMoment.isBefore(moment(time['Asr'],'hh:mm'))){
            prayerIndex=2;
        }else if(currentMoment.isAfter(moment(time['Asr'],'hh:mm')) && currentMoment.isBefore(moment(time['Sunset'],'hh:mm'))){
            prayerIndex=3;
        }
        else if(currentMoment.isAfter(moment(time['Sunset'],'hh:mm')) && currentMoment.isBefore(moment(time['Isha'],'hh:mm'))){
            prayerIndex=4;
        }else{
            prayerIndex=0;
        }
        setNextPrayer(prayerIndex);
        const nextPrayerObj=prayersArray[prayerIndex];
        const nextPrayerTime=moment(time[nextPrayerObj.key],'hh:mm');
        let remainingTime=moment(nextPrayerTime).diff(currentMoment);
        if(remainingTime<0){
            const midNightDiff=moment("23:59:59","hh:mm:ss").diff(currentMoment);
            const fajrToMidDiff=moment(nextPrayerTime).diff(moment("00:00:00","hh:mm::ss"));
            const totalDiff=midNightDiff+fajrToMidDiff;
            remainingTime=totalDiff;
        }
        const duration= moment.duration(remainingTime);
        setRemainingTime(
            `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
        )


    }
    return (
        <div >
            <Grid container spacing={2} style={{ direction: "rtl", padding: "8px", color: "white" }} justifyContent={"space-between"}>
                <Grid xs={6}>
                    <Typography variant="body1" >
                        {today}
                    </Typography>
                    <Typography variant="h3">
                        {city.displayName}
                        
                    </Typography>
                </Grid>
                <Grid size={6}>
                    <Typography variant="body1" >
                        متبقي حتي صلاه {prayersArray[nextPrayer].displayName}
                    </Typography>
                    <Typography variant="h4" >
                        {remainingTimeState}
                    </Typography>
                </Grid>
            </Grid>
            <Divider style={{ background: "white", marginTop: "30px" }} />

            <Stack direction="row" style={{ margin: "15px 5px ", padding: "10px", direction: "rtl" }} justifyContent={"space-between"} >
                <CardPray name="الفجر" time={time.Fajr} image={"https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"} />
                <CardPray name="الظهر" time={time.Dhuhr} image={'https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw='} />
                <CardPray name="العصر" time={time.Asr} image={"https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw="} />
                <CardPray name="المغرب" time={time.Maghrib} image={"https://i.pinimg.com/736x/8c/69/a0/8c69a0c899bfb5254633395a9017be79.jpg"} />
                <CardPray name="العشاء" time={time.Isha} image={"https://i.pinimg.com/474x/2b/4f/9c/2b4f9cf1a7312cac0697385353f45ea0.jpg"} />
            </Stack>
            <Stack
                direction="row"
                justifyContent={"center"}
                style={{ marginTop: "40px" }}
            >
                <FormControl style={{ width: "20%" }}>
                    <InputLabel id="demo-simple-select-label">
                        <span style={{ color: "white" }}>المدينة</span>
                    </InputLabel>
                    <Select
                        style={{ color: "white" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        onChange={handleCityName}
                    >
                        {
                            avaliableCity.map((city) => {
                                return (<MenuItem value={city.apiName} > {city.displayName}</MenuItem>
                                )
                            })
                        }

                    </Select>
                </FormControl>
            </Stack>

        </div>
    )
}
