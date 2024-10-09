import { disable, setRestaurants, updateRestaurant } from "@/redux/slices/AutorisationSlice";
import { Dispatch } from "redux";

type Params = {
    dispatch: Dispatch;
};

function timeToSeconds(time: string): number {
    const parts = time.split(':');
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
}

function compareTimes(time1: string, time2: string): number {
    return timeToSeconds(time1) - timeToSeconds(time2);
}

export default function times({ dispatch }: Params) {
    const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const timeOfThisMoment = new Date();
    const localTime = timeOfThisMoment.toLocaleTimeString('fr-FR', options);

    console.log('Local time:', localTime);

    dispatch(setRestaurants([
      { id: 1, name: 'Restaurant I', ordered: false, validated: false },
      { id: 2, name: 'Restaurant II', ordered: false, validated: false }
  ]));
    
    if (compareTimes(localTime, '06:00:00') > 0) {
        // Ouverture des commandes
        console.log('Ouverture des commandes');
        dispatch(disable(true));
        dispatch(updateRestaurant({ id:1, ordered: false,valided:false }))
        dispatch(updateRestaurant({ id:2, ordered: false,valided:false }))
    }

    if (compareTimes(localTime, '16:00:00') > 0) {
        // Fermeture du restaurant 1
        dispatch(updateRestaurant({ id:1, ordered: true,valided:true }))
        console.log('Fermeture du restaurant 1');
        // dispatch(R1_disabled(true));
    }

    if (compareTimes(localTime, '20:00:00') > 0) {
      // Fermeture du restaurant 2
      dispatch(updateRestaurant({ id:2, ordered: true,valided:true }))
      console.log('ouverture du restaurant 2');
      dispatch(disable(true));
  }

    // Uncomment the following block if you want to enable the restaurant 2 logic
    /*
    if (compareTimes(localTime, '16:16:00') > 0) {
        // Fermeture du restaurant 2
        console.log('Fermeture du restaurant 2');
        dispatch(R2_disabled(true));
    }
    */
}