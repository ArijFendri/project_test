function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const controlPanelButton = document.querySelector('.control-panel');
  const menuText = document.querySelectorAll('.menu-text');
  const userName = document.querySelector('.user-name');
  const logo = document.querySelector('.logo-co'); 
  const logoSection = document.querySelector('.logo-section'); 
  const mainContent = document.querySelector('.main-content'); 

  sidebar.classList.toggle('collapsed');
  userName.classList.toggle('collapsed');
  menuText.forEach(item => {
    item.classList.toggle('collapsed');
  });
  controlPanelButton.classList.toggle('collapsed');

  if (sidebar.classList.contains('collapsed')) {
    logo.src = "assets/logos/logo.png";  
    logoSection.classList.add("logo-collapsed");
    logoSection.classList.remove("logo-expanded");
    const fullName = userName.getAttribute('data-full-name') || userName.textContent.trim();
    userName.textContent = fullName.charAt(0).toUpperCase();
    userName.classList.add('user-name-collapsed');
    userName.classList.remove('user-name-expanded');
    mainContent.style.marginLeft = `80px`;
} else {
    logo.src = "assets/logos/Vector.png"; 
    logoSection.classList.add("logo-expanded");
    const fullName = userName.getAttribute('data-full-name');
    userName.textContent = fullName;
    logoSection.classList.remove("logo-collapsed-expanded");
    userName.classList.add('user-name-expanded')
    userName.classList.remove('user-name-collapsed') 
    mainContent.style.marginLeft = `250px`;
  }
}
