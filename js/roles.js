 function createRoleBadge(role) {
  const roleClasses = {
    Administrateur: "badge-admin",
    Opérationnel: "badge-operational",
    Support: "badge-support",
    Facturation: "badge-billing"
  };

  const className = roleClasses[role] || "badge-default";
  return `<span class="badge ${className}">${role}</span>`;
}

function displayTableData() {
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, users.length);
  const pageData = users.slice(start, end);

  pageData.forEach((user,index) => {
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
          <td><input type="checkbox"></td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.center}</td>
          <td>${createRoleBadge(user.role)}</td> <!-- Utilisation du badge -->
          <td>${user.lastLogin}</td>
          <td>${user.creationDate}</td>
        </tr>
      `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // itemCount.textContent = `Affichage de ${start + 1} à ${end} sur ${
  //   users.length
  // } utilisateurs`;
}



module.exports = createRoleBadge;
