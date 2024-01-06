import React from "react";
import { Image, Button } from "react-bootstrap";
import axios from "axios";

import pups from "../../../assets/workouts/push_ups.jpg";
import inclinePups from "../../../assets/workouts/incline_push_ups.jpg";
import declinePups from "../../../assets/workouts/decline_push_ups.jpg";
import wallPups from "../../../assets/workouts/wall_push_ups.jpg";
import kneePups from "../../../assets/workouts/knee_push_ups.jpg";

import bicepCurl from "../../../assets/workouts//bicep_curl.jpg";
import tricepsDips from "../../../assets/workouts/triceps_dips.jpg";

import bulgarian from "../../../assets/workouts/bulgarian_split_squats.jpg";
import calfRaises from "../../../assets/workouts/calf_raises.jpg";
import weightCalfRaises from "../../../assets/workouts/calf_raises_with_weight.jpg";
import lunges from "../../../assets/workouts/lunges.jpg";
import pistolSquat from "../../../assets/workouts/pistol_squats.jpg";
import squats from "../../../assets/workouts/squats.jpg";

import russianTwist from "../../../assets/workouts/russian_twists.jpg";
import legRaises from "../../../assets/workouts/leg_raises.png";
import cruches from "../../../assets/workouts/crunches.jpg";

const imageMapping = {
  'Push ups': pups,
  'Incline push ups': inclinePups,
  'Decline push ups': declinePups,
  'Wall push ups': wallPups,
  'Easy push ups': kneePups,
  'Bicep Curls with Household Items (min 2 kg)': bicepCurl,
  'Hammer curls with Household Items (4kg and above)': bicepCurl,
  'Hammer curls with Household Items (6kg and above)': bicepCurl,
  'Tricep dips': tricepsDips,
  'Bulgarian split squats': bulgarian,
  'Calf raises': calfRaises,
  'Calf raises with weight': weightCalfRaises,
  'Lunges': lunges,
  'Lunges with weight': lunges,
  'Pistol squats': pistolSquat,
  'Bodyweight squats': squats,
  'Squats with weights': squats,
  'Russian Twists': russianTwist,
  'Russian Twists with weights': russianTwist,
  'Leg Raises': legRaises,
  'Hanging leg raises': legRaises,
  'Crunches': cruches,
};

export default function Plan({ onNext, currentNb, currentWorkout }) {
  console.log(currentWorkout);
  const exerciseImage = imageMapping[currentWorkout.exercisename];

  return (
    <div className="p-3">
      <div className="p-3 bg-light d-flex justify-content-around align-items-center">
        <div className="p-3">
          <Image src={exerciseImage} style={{ width: "300px" }} />
        </div>
        <div className="">
          <br />
          <p className="h3 text-center">{currentWorkout.exercisename}</p>
          <p className="h4 text-center text-primary">
            {currentWorkout.exercisetype}
          </p>
          <p className="h5">
            Number of sets:{" "}
            <span className="text-primary">
              {currentWorkout.exercisenbofsets}
            </span>
          </p>
          <p className="h5">
            Number of reps:{" "}
            <span className="text-primary">
              {currentWorkout.exercisenbofreps}{" "}
            </span>
          </p>
          <br />
          <br />
          <div className="text-center">
            <Button
              onClick={() => onNext(currentNb)}
              size="sm"
              variant="outline-primary pulse sign-in-btn"
            >
              Next Exercise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
