interface Exercise {
    id: number;
    name: string;
    color: string;
}

interface ExerciseCardProps {
    exercise: Exercise;
}

export default function ButtonExercise({exercise} : ExerciseCardProps) {
    return (
        <div className={`px-4 py-4 bg-${exercise.color}-300 hover:bg-${exercise.color}-600`}>
            {exercise.name}
        </div>
    )
}   