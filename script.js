document.addEventListener('DOMContentLoaded', function () {
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 1000);
});


function updateTimeAndDate() {
  const now = new Date();
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const formattedTime = now.toLocaleString('en-US', options);
  const formattedDate = now.toDateString();

  timeElement.textContent = formattedTime;
  dateElement.textContent = formattedDate;
}


const planets = document.querySelectorAll('.planet')
const p_radii = [22,33,50,70,112,138,165,190]
let p_radians = new Array(8).fill(0)
const p_velocities = [1.607, 1.174,1,0.802, 0.434, 0.323, 0.228, 0.182]

const moon = document.querySelector('#moon')
const m_radius = 8
let m_radians = 0
const m_velocity = 10

const p_orbits = document.querySelectorAll('.p-orbit')
const m_orbit = document.querySelector('#m-orbit')

p_orbits.forEach((p_orbit, index)=>{
  p_orbit.style.height = `${p_radii[index]}vmin`
  p_orbit.style.width = `${p_radii[index]}vmin`
})

setInterval( ()=> {
  planets.forEach( (planet, index)=>{
    planet.style.left = `${Math.cos(p_radians[index]) * p_radii[index]}vmin`
    planet.style.top = `${Math.sin(p_radians[index]) * p_radii[index]}vmin`
    p_radians[index] += p_velocities[index] * 0.02
  })

  moon.style.left = `${earthX() + (Math.cos(m_radians) * m_radius )}vmin`
  moon.style.top = `${earthY() + (Math.sin(m_radians) * m_radius )}vmin`
  m_radians += m_velocity * 0.02

  m_orbit.style.left = `${earthX()}vmin`
  m_orbit.style.top = `${earthY()}vmin`
}, 1000/60)

function earthX(){
  return Number( planets[2].style.left.split('vmin')[0] )
}

function earthY(){
  return Number( planets[2].style.top.split('vmin')[0] )
}

const planetInfo = document.getElementById('planet-info');
const planetNameElement = document.getElementById('planet-name');
const planetSpeedElement = document.getElementById('planet-speed');
const planetTimeElement = document.getElementById('planet-time');


planets.forEach(planet => {
  planet.addEventListener('mouseover', () => {
    showPlanetInfo(planet);
  });

  planet.addEventListener('mouseout', () => {
    hidePlanetInfo();
  });

  planet.addEventListener('click', () => {
    showPlanetInfo(planet);
  });
});

const planetImageContainer = document.getElementById('planet-image-container');
const planetImage = document.getElementById('planet-image');

function showPlanetInfo(planet) {
  const planetName = planet.id.charAt(0).toUpperCase() + planet.id.slice(1);
  const planetSpeed = getPlanetSpeed(planet.id);
  const planetTime = getPlanetTime(planet.id);
  const planetImagePath = `img/${planet.id}.png`;

  planetNameElement.textContent = planetName;
  planetSpeedElement.textContent = `Speed: ${planetSpeed}`;
  planetTimeElement.textContent = `Time Taken: ${planetTime}`;
  planetImage.src = planetImagePath;

  planetInfo.style.display = 'block';
  planetImageContainer.style.display = 'block';
}

function hidePlanetInfo() {
  planetInfo.style.display = 'none';
  planetImageContainer.style.display = 'none';
  planetImage.src = '';
}


function getPlanetSpeed(planetId) {
  const speeds = {
    mercury: '47.87 km/s',
    venus: '35.02 km/s',
    earth: '29.78 km/s',
    mars: '24.07 km/s',
    jupiter: '13.06 km/s',
    saturn: '9.69 km/s',
    uranus: '6.81 km/s',
    neptune: '5.43 km/s'
  };

  return speeds[planetId] || 'N/A';
}

function getPlanetTime(planetId) {
  const times = {
    mercury: '88 days',
    venus: '225 days',
    earth: '365.25 days',
    mars: '687 days',
    jupiter: '4,333 days',
    saturn: '10,759 days',
    uranus: '30,687 days',
    neptune: '60,190 days'
  };

  return times[planetId] || 'N/A';
}

const planetButtons = document.querySelectorAll('.planet-button');

planetButtons.forEach(button => {
  button.addEventListener('click', () => {
    const planetId = button.getAttribute('data-planet');
    const planet = document.getElementById(planetId);
    if (planet) {
      showPlanetInfo(planet);
    }
  });
});