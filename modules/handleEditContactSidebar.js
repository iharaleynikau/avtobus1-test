import { groupsStorage } from './handleStorage'
import IMask from 'imask'

export const handleEditContactSidebar = (
  initials,
  number,
  groupId,
  groupName,
  id
) => {
  const editContactSidebar = document.querySelector('#editContactSidebar')
  const darkenBackground = document.querySelector('.darken-background')
  const initialsInput = document.querySelector('#editContactSidebarInitials')
  const numberInput = document.querySelector('#editContactSidebarNumber')

  const closeEditContactSidebarBtn = document.querySelector(
    '#closeEditContactSidebarBtn'
  )

  closeEditContactSidebarBtn.addEventListener('click', () => {
    editContactSidebar.classList.remove('active')
    darkenBackground.style.display = 'none'
  })

  const editContactSidebarNumber = document.querySelector(
    '#editContactSidebarNumber'
  )

  IMask(editContactSidebarNumber, {
    mask: '+{7} (000) 000-00-00',
  }).value = number

  const saveEditedContactBtn = document.querySelector('#saveEditedContactBtn')

  initialsInput.value = initials
  numberInput.value = number

  saveEditedContactBtn.onclick = () => {
    const contactItem = document.querySelector(`div[id="${id}"]`)

    const contactItemInitials = contactItem.querySelector(
      '.contact-item__initials'
    )

    const contactItemNumber = contactItem.querySelector('.contact-item__number')

    contactItemInitials.textContent = initialsInput.value
    contactItemNumber.textContent = numberInput.value

    const storage = groupsStorage.get()

    const currentGroup = storage.find((group) => group.id === groupId)

    const currentGroupIndex = storage.indexOf(currentGroup)

    storage[currentGroupIndex].contacts.map((contact) => {
      if (contact.id === id) {
        contact.initials = initialsInput.value
        contact.number = numberInput.value
      }

      return contact
    })

    groupsStorage.set(storage)
  }

  const editContactSidebarGroup = document.querySelector(
    '#editContactSidebarGroup'
  )
  editContactSidebarGroup.setAttribute('value', groupName)

  editContactSidebar.classList.add('active')
  darkenBackground.style.display = 'block'
}
