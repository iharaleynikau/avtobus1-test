import { createSidebarGroupItem } from './components/createSidebarGroupItem'
import { createContactCard } from './components/createContactCard'
import { groupsStorage } from './handleStorage'
import { uniqueId } from './utils'

export const handleGroupsSidebar = () => {
  const openGroupsSidebarBtn = document.querySelector('#openGroupsSidebarBtn')
  const closeGroupsSidebarBtn = document.querySelector('#closeGroupsSidebarBtn')
  const emptyListTextElement = document.querySelector('.empty-list-text')

  const darkenBackground = document.querySelector('.darken-background')
  const groupsSidebar = document.querySelector('#groupsSidebar')

  const addGroupBtn = document.querySelector('#addGroupBtn')
  const saveGroupBtn = document.querySelector('#saveGroupBtn')
  const groupsList = document.querySelector('.sidebar__groups-list')

  if (groupsStorage.get()) {
    for (let group of groupsStorage.get()) {
      const groupsSidebarItem = createSidebarGroupItem(
        group.id,
        true,
        group.groupName
      )

      groupsList.appendChild(groupsSidebarItem)
    }
  }

  openGroupsSidebarBtn.addEventListener('click', () => {
    groupsSidebar.classList.add('active')
    darkenBackground.style.display = 'block'
  })

  closeGroupsSidebarBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.active')
    sidebar.classList.remove('active')
    darkenBackground.style.display = 'none'
  })

  addGroupBtn.addEventListener('click', () => {
    const id = uniqueId()

    const groupItem = createSidebarGroupItem(id)

    groupsList.appendChild(groupItem)
  })

  saveGroupBtn.addEventListener('click', () => {
    emptyListTextElement.classList.add('display-none')

    const inputsList = document.querySelectorAll('input[name="groupInput"]')

    if (!inputsList.length) {
      return
    }

    let storage

    if (!groupsStorage.get()) {
      groupsStorage.set([])
      storage = groupsStorage.get()
    } else {
      storage = groupsStorage.get()
    }

    inputsList.forEach((item) => {
      if (item.value && item.getAttribute('disabled') === null) {
        const inputsData = {
          groupName: `${item.value}`,
          id: item.closest('div').getAttribute('id'),
          contacts: [],
        }

        storage.push(inputsData)

        item.setAttribute('disabled', '')

        const contactsSidebarOtionItem = document.createElement('option')
        const contactsSidebarSelectGroup =
          document.querySelector('#selectGroup')

        contactsSidebarOtionItem.textContent = inputsData.groupName

        contactsSidebarOtionItem.value = `${inputsData.id}&${inputsData.groupName}`

        const cardElement = createContactCard(
          inputsData.groupName,
          inputsData.id
        )

        contactsSidebarSelectGroup.appendChild(contactsSidebarOtionItem)

        const groupListElement = document.querySelector('.contacts')

        groupListElement.appendChild(cardElement)
      }
    })

    groupsStorage.set(storage)
  })
}
