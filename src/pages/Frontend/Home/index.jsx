import Courses from './Courses'
import Hero from './Hero'
import Services from './Services'
import Stats from './Stats'

const Home = () => {
    return (
        <main style={{ backgroundColor: "var(--bg-page)" }}>
            <Hero />
            <Stats />
            <Services/>
            <Courses/>
        </main>
    )
}

export default Home