import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {
  restaurantRow,
  restaurantModal,
} from './components.js';


const restaurantList =
  document.querySelector('#restaurant-list');

const modal =
  document.querySelector('#restaurant-modal');


const getRestaurants = async () => {
  try {
    const restaurants =
      await fetchData(`${baseUrl}/restaurants`);

    restaurants.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    restaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);

      row.addEventListener('click', async () => {
        document
          .querySelectorAll('tr')
          .forEach((tr) =>
            tr.classList.remove('highlight')
          );

        row.classList.add('highlight');

        try {
          const menu = await fetchData(
            `${baseUrl}/restaurants/daily/${restaurant._id}/fi`
          );

          modal.innerHTML =
            restaurantModal(restaurant, menu);

          modal.showModal();

          const closeButton =
            document.querySelector('#close-modal');

          closeButton.addEventListener('click', () => {
            modal.close();
          });

        } catch (error) {
          console.error(
            'Error fetching menu:',
            error
          );
        }
      });

      restaurantList.appendChild(row);
    });

  } catch (error) {
    console.error(
      'Error fetching restaurants:',
      error
    );
  }
};


void getRestaurants();
