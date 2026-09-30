export const restaurantRow = (restaurant) => {
  const {name, company} = restaurant;

  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${name}</td>
    <td>${company}</td>
  `;

  return tr;
};


export const restaurantModal = (restaurant, menu) => {
  const {
    name,
    address,
    postalCode,
    city,
    phone,
    company,
  } = restaurant;

  const {courses = []} = menu;

  let menuHtml = '<ul>';

  courses.forEach((course) => {
    const {
      name,
      price,
      diets,
    } = course;

    menuHtml += `
      <li>
        ${name},
        ${price ?? 'No price'}
        ${diets?.length ? `(${diets})` : ''}
      </li>
    `;
  });

  menuHtml += '</ul>';

  return `
    <h2>${name}</h2>

    <p><strong>Address:</strong> ${address}</p>

    <p>
      <strong>Postal code:</strong>
      ${postalCode}
    </p>

    <p><strong>City:</strong> ${city}</p>

    <p>
      <strong>Phone:</strong>
      ${phone ?? '-'}
    </p>

    <p>
      <strong>Company:</strong>
      ${company}
    </p>

    <h3>Today's menu</h3>

    ${courses.length > 0
    ? menuHtml
    : '<p>No menu available today.</p>'}

    <button id="close-modal">Close</button>
  `;
};
