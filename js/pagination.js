
const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");
const rowsPerPageSelect = document.getElementById("rows-per-page-select");

let roles = ["Administrateur", "Opérationnel", "Facturation", "Support"];
let centers = ["Voicecom", "ECR", "Newtek", "Almaviva", "Active Contact", "PCCI", "PhoneAct"];

let users = Array.from({ length: 100 }, (_, i) => ({
  name: `Nicholas Renner`,
  email: `Yvette.OConner@gmail.com`,
  center: centers[i % centers.length],
  role: roles[i % roles.length], 
  lastLogin: i % 2 === 0 ? "Jamais connecté" : "17/05/2024",
  creationDate: "17/05/2024"
}));


let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);

function displayTableData() {
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, users.length);
  const pageData = users.slice(start, end);

  pageData.forEach((user, index) => {
    const uniqueId = start + index;
    const row = `
      <tr>
        <td>
        <div class="cell">
          <input type="checkbox">
          <div class="dropdown">
            <button class="menu-button" data-id="${uniqueId}">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="menu" id="menu-${uniqueId}">
              <li class="menu-item">
                <i class="fas fa-paper-plane"></i> Renouveler l'invitation
              </li>
              <li class="menu-item">
                <i class="fas fa-edit"></i> Modifier
              </li>
              <li class="menu-item">
                <i class="fas fa-archive"></i> Archiver
              </li>
            </ul>
          </div>
          </div>
        </td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.center}</td>
        <td>${createRoleBadge(user.role)}</td>
        <td>${user.lastLogin}</td>
        <td>${user.creationDate}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // itemCount.textContent = `Affichage de ${start + 1} à ${end} sur ${
  //   users.length
  // } utilisateurs`;

  attachMenuEvents();
}


function attachMenuEvents() {
  const menuButtons = document.querySelectorAll(".menu-button");

  menuButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const menuId = button.getAttribute("data-id");
      const menu = document.getElementById(`menu-${menuId}`);
      const allMenus = document.querySelectorAll(".menu");

      allMenus.forEach((m) => {
        if (m !== menu) m.classList.remove("visible");
      });

      menu.classList.toggle("visible");
    });
  });
}

document.addEventListener("click", () => {
  const allMenus = document.querySelectorAll(".menu");
  allMenus.forEach((menu) => menu.classList.remove("visible"));
});

function setupPagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(users.length / rowsPerPage);

  const createButton = (text, page) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("pagination-btn");
    if (page === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = page;
      displayTableData();
      setupPagination();
    });
    return btn;
  };

  if (currentPage > 1) {
    const prevBtn = createButton("<", currentPage - 1);
    pagination.appendChild(prevBtn);
  }

  
  pagination.appendChild(createButton(1, 1));
  if (currentPage > 3) {
    const ellipsis = document.createElement("span");
    ellipsis.textContent = "...";
    ellipsis.classList.add("pagination-ellipsis");
    pagination.appendChild(ellipsis);
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(pageCount - 1, currentPage + 1);
  for (let i = startPage; i <= endPage; i++) {
    pagination.appendChild(createButton(i, i));
  }

  if (currentPage < pageCount - 2) {
    const ellipsis = document.createElement("span");
    ellipsis.textContent = "...";
    ellipsis.classList.add("pagination-ellipsis");
    pagination.appendChild(ellipsis);
  }
  pagination.appendChild(createButton(pageCount, pageCount));

  if (currentPage < pageCount) {
    const nextBtn = createButton(">", currentPage + 1);
    pagination.appendChild(nextBtn);
  }
}

rowsPerPageSelect.addEventListener("change", () => {
  rowsPerPage = parseInt(rowsPerPageSelect.value);
  currentPage = 1;
  displayTableData();
  setupPagination();
});

displayTableData();
setupPagination();
