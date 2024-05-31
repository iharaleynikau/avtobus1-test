export const handleCloseSidebars = () => {
  const darkenBackground = document.querySelector('.darken-background')

  document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.active')

    if (e.target === darkenBackground) {
      sidebar.classList.remove('active')
      darkenBackground.style.display = 'none'
    }
  })
}
