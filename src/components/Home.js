import React from 'react';
import BarChart from './BarChart';
import './Home.css'


function Home() {

    return (
        <div className='home'>
            <p>Ik heb vorig jaar een klein deel van de Tech Track gevolgd, hier kregen wij de opdracht om een interessante invalshoek over de auto in de stad te vinden met behulp van RDW datasets.</p>
            <p>Ik heb gekeken naar de verschillende betaalmogelijkheden voor parkeren in Nederland en Amsterdam en hier in d3 een visualisatie gemaakt.</p>

            <BarChart />
        </div>
    )
}

export default Home;
