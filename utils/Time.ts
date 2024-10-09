import { disbale, R1_disabled, R2_disabled } from "@/redux/slices/AutorisationSlice";
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
    
    if (compareTimes(localTime, '06:00:00') > 0) {
        // Ouverture des commandes
        console.log('Ouverture des commandes');
        dispatch(disbale(true));
    }

    if (compareTimes(localTime, '16:00:00') > 0) {
        // Fermeture du restaurant 1
        console.log('Fermeture du restaurant 1');
        dispatch(R1_disabled(true));
    }

    if (compareTimes(localTime, '16:16:00') > 0) {
      // Fermeture du restaurant 2
      console.log('ouverture du restaurant 2');
      dispatch(R2_disabled(false));
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