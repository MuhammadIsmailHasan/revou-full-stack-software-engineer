import { Footer } from "../components/Footer";
import Header from "../components/Header";
import ButtonExercise from "./components /HandOnsSection";

const exercises = [
    {id: 1, name: "Hands On 1", color: "red"},
    {id: 2, name: "Hands On 2", color: "blue"},
    {id: 3, name: "Hands On 3", color: "green"},
]

export default function Day4() {
    return (
        <>
            <Header></Header>
            <main className="p-5 m-5 w-full max-w-6xl mx-auto border border-green-900 rounded-xl">
                {
                    exercises.map(e => (
                        <ButtonExercise key={e.id} exercise={e}></ButtonExercise>
                    ))
                }
            </main>
            <Footer></Footer>
        </>
    )
}