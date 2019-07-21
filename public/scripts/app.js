console.log('As you wish...');
// -------------------------------- CONSTANT VARIABLES ------------------------------- //

const BASE_URL = '/api/v1/cities';

// -------------------------------- GLOBAL VARIABLES ------------------------------- //


// -------------------------------- STATE VARIABLES ------------------------------- //

const state = {
  cities: [],
}

// -------------------------------- DOM ELEMENTS ------------------------------- //

const newCityForm = document.getElementById('newCityForm');
const citiesSection = document.getElementById('cities');

// -------------------------------- FUNCTIONS ------------------------------- //

const render = (data) => {
  citiesSection.innerHTML = '';
  data.forEach(city => {
    const template = cityTemplate(city);
    citiesSection.insertAdjacentHTML('afterbegin', template);
  });
}


const getAllCities = () => {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then(json => {
      state.cities = json.data;
      render(state.cities);
    })
    .catch((err) => console.log(err));
}

getAllCities();


const cityTemplate = (city) => {
  return `
    <div id="${city._id}">
      <h4>${city.name}</h4>
      <p class="description">${city.description}</p>
      <button class="delete-button">&times;</button>
      <button class="edit-button">edit</button>
    </div>
  `;
}


const addNewCity = (event) => {
  event.preventDefault();
  const name = document.getElementById('name');
  const description = document.getElementById('description');
  const newCity = { name: name.value, description: description.value };
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCity),
  })
    .then((res) => res.json())
    .then((data) => {
      state.cities.push(data.data);
      render(state.cities);
      name.value = '';
      description.value = '';
      name.focus();
    })
    .catch((err) => console.log(err))
}


const deleteCity = (event) => {
  const cityId = event.target.parentNode.id;
  fetch(`${BASE_URL}/${cityId}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => getAllCities())
    .catch((err) => console.log(err));
}

const editCity = (event) => {
  const cityName = event.target.parentNode.children[0].innerText;
  const cityDescription = event.target.parentNode.children[1].innerText;
  event.target.parentNode.innerHTML = `
    <h4>Edit ${cityName}</h4>
    <form>
      <div>
        <label style="display: block;" for="cityName">City Name</label>
        <input type="text" id="editCityName" name="name" value="${cityName}" />
      </div>
      <div>
        <label style="display: block;" for="cityDescription">City Descriptioin</label>
        <input type="text" id="editCityDescription" name="description" value="${cityDescription}" />
      </div>
      <button type="button" class="cancel-edit">Cancel</button>
      <button class="submit-edit">Submit</button>
    </form>
  `;
}


const updateCity = (event) => {
  const cityId = event.target.parentNode.parentNode.id;
  const cityName = document.getElementById('editCityName').value;
  const cityDescription = document.getElementById('editCityDescription').value;
  const updatedCity = { name: cityName, description: cityDescription };
  fetch(`${BASE_URL}/${cityId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCity),
  })
    .then((res) => res.json())
    .then((data) => getAllCities())
    .catch((err) => console.log(err));
}


const handleCitySectionClick = (event) => {
  event.preventDefault();
  if (event.target.classList.contains('edit-button')) {
    editCity(event);
  } else if (event.target.classList.contains('submit-edit')) {
    updateCity(event);
  } else if (event.target.classList.contains('cancel-edit')) {
    getAllCities();
  } else if (event.target.classList.contains('delete-button')) {
    deleteCity(event);
  }
}


// -------------------------------- EVENT LISTENERS ------------------------------- //

newCityForm.addEventListener('submit', addNewCity);
citiesSection.addEventListener('click', handleCitySectionClick);
