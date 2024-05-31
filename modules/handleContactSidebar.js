import { groupsStorage } from './handleStorage'
import IMask from 'imask'
import { createContactItem } from './components/createContactItem'
import { uniqueId } from './utils'

export const handleContactSidebar = () => {
  const darkenBackground = document.querySelector('.darken-background')
  const contactsSidebar = document.querySelector('#contactsSidebar')
  const saveContactBtn = document.querySelector('#saveContactBtn')

  const contactsSidebarNumber = document.querySelector('#contactsSidebarNumber')

  IMask(contactsSidebarNumber, {
    mask: '+{7} (000) 000-00-00',
  })

  const form = document.querySelector('#contacts-form')
  const inputs = form.getElementsByTagName('input')
  const select = form.querySelector('#selectGroup')

  const openContactsSidebarBtn = document.querySelector(
    '#openContactsSidebarBtn'
  )
  const closeContactsSidebarBtn = document.querySelector(
    '#closeContactsSidebarBtn'
  )

  if (groupsStorage.get()) {
    groupsStorage.get().forEach((group) => {
      const optionItem = document.createElement('option')
      optionItem.textContent = group.groupName

      optionItem.value = `${group.id}&${group.groupName}`

      select.appendChild(optionItem)
    })
  }

  openContactsSidebarBtn.addEventListener('click', () => {
    contactsSidebar.classList.add('active')

    darkenBackground.style.display = 'block'
  })

  closeContactsSidebarBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.active')
    sidebar.classList.remove('active')

    darkenBackground.style.display = 'none'
  })

  saveContactBtn.addEventListener('click', () => {
    const contactData = {
      groupId: select.value.split('&')[0],
      groupName: select.value.split('&')[1],
      id: uniqueId(),
    }

    for (let input of inputs) {
      if (!input.value) {
        input.focus()
        return
      }

      contactData[input.name] = input.value
    }

    if (select.value === 'none') {
      return
    }

    const storage = groupsStorage.get()

    const groupIndex = storage.findIndex(
      (group) => group.id === contactData.groupId
    )

    storage[groupIndex].contacts.push(contactData)

    groupsStorage.set(storage)

    const cardBody = document.querySelector(`div[id="${contactData.groupId}"]`)

    const contactItem = createContactItem(
      contactData.initials,
      contactData.number,
      contactData.groupId,
      contactData.id
    )

    cardBody.appendChild(contactItem)
  })
}
