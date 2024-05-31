import { handleEditContactSidebar } from '../handleEditContactSidebar'
import deleteSvg from '../../assets/delete.svg'
import editSvg from '../../assets/edit.svg'

export const createContactItem = (initials, number, groupId, id) => {
  const contactItem = document.createElement('div')
  contactItem.classList.add('contact-item')
  contactItem.setAttribute('id', id)

  const contactItemInitials = document.createElement('span')
  contactItemInitials.classList.add('contact-item__initials')
  contactItemInitials.textContent = initials

  const contactInfo = document.createElement('div')
  contactInfo.classList.add('flex-align-center')
  contactInfo.classList.add('contact__number-wrapper')

  const contactNumber = document.createElement('span')
  contactNumber.classList.add('contact-item__number')
  contactNumber.textContent = number

  const buttonsContainer = document.createElement('div')

  buttonsContainer.classList.add('contact-item__buttons-container')

  const editContactBtn = document.createElement('button')
  editContactBtn.classList.add('item-btn')
  editContactBtn.setAttribute('id', 'editContactBtn')

  editContactBtn.addEventListener('click', () => {
    const storage = JSON.parse(localStorage.getItem('groups'))

    const groupName = storage.find((group) => group.id === groupId).groupName

    handleEditContactSidebar(initials, number, groupId, groupName, id)
  })

  const deleteContactBtn = document.createElement('button')
  deleteContactBtn.classList.add('item-btn')
  deleteContactBtn.setAttribute('id', 'deleteContactBtn')

  buttonsContainer.appendChild(editContactBtn)
  buttonsContainer.appendChild(deleteContactBtn)

  deleteContactBtn.addEventListener('click', () => {
    const storage = JSON.parse(localStorage.getItem('groups'))

    storage.map((group) => {
      if (group.id === groupId) {
        group.contacts = group.contacts.filter((contact) => contact.id !== id)
      }
    })

    contactItem.remove()
    localStorage.setItem('groups', JSON.stringify(storage))
  })

  const editIcon = document.createElement('img')
  editIcon.setAttribute('src', editSvg)

  const deleteIcon = document.createElement('img')
  deleteIcon.setAttribute('src', deleteSvg)

  editContactBtn.appendChild(editIcon)
  deleteContactBtn.appendChild(deleteIcon)

  contactInfo.appendChild(contactNumber)
  contactInfo.appendChild(buttonsContainer)

  contactItem.appendChild(contactItemInitials)
  contactItem.appendChild(contactInfo)

  return contactItem
}
