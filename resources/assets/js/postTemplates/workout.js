export function workoutCancelTemplate(workout){
    return {
        title:'Odwołanie treningu',
        content:`
Trening planowany na dzień **${workout.start}** został odwołany.
        `,
    }
}

export function workoutDateChangeTemplate(prevWorkout,workout){
    return {
        title:'Przesunięcie treningu',
        content:`
Trening o planowanym rozpoczęciu w dniu **${prevWorkout.start}** i planowanym zakończeniu **${prevWorkout.end}** został przesunięty.

Trening rozpocznię się **${workout.start}** i zakończy **${workout.end}**.
        `,
    }
}

export function undoWorkoutCancelTemplate(workout, updatedWorkout){
    return {
        title:'Przywrócenie odwołanego treningu',
        content:`
Odwołany trening z dnia **${workout.start}** zostaje przywrócony.

Trening rozpocznie się **${updatedWorkout.start}** i zakończy **${updatedWorkout.end}**
        `,
    }
}