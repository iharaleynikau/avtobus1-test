import deleteSvg from '../../assets/delete.svg'
import { groupsStorage } from '../handleStorage'

export const createSidebarGroupItem = (id, disabled = false, value = '') => {
  const groupSidebarItem = document.createElement('div')
  groupSidebarItem.classList.add('sidebar__groups-list-item')
  groupSidebarItem.setAttribute('id', id)

  const emptyListTextElement = document.querySelector('.empty-list-text')

  const groupSidebarItemInput = document.createElement('input')
  groupSidebarItemInput.setAttribute('placeholder', 'Введите название')
  groupSidebarItemInput.setAttribute('name', 'groupInput')

  groupSidebarItemInput.value = value
  disabled && groupSidebarItemInput.setAttribute('disabled', '')

  const sidebarDeleteItemBtn = document.createElement('button')
  sidebarDeleteItemBtn.classList.add('item-btn')

  sidebarDeleteItemBtn.addEventListener('click', (event) => {
    groupSidebarItem.remove()

    const storage = groupsStorage.get()

    const isGroupItemInStorage = storage.find((group) => group.id === id)

    if (isGroupItemInStorage) {
      const card = document
        .querySelector(`div[id="${id}"]`)
        .closest('.card-wrapper')

      card.remove()

      const filteredStorage = storage.filter((group) => group.id !== id)

      const currentGroupByName = storage.find((group) => group.id === id)

      groupsStorage.set(filteredStorage)

      if (!groupsStorage.get().length) {
        emptyListTextElement.classList.remove('display-none')
      }

      if (!currentGroupByName) {
        return
      }

      const optionItem = document.querySelector(
        `option[value="${id}&${currentGroupByName.groupName}"]`
      )

      optionItem.remove()
    }
  })

  const sidebarDeleteItemIcon = document.createElement('img')
  sidebarDeleteItemIcon.setAttribute('src', deleteSvg)

  groupSidebarItem.appendChild(groupSidebarItemInput)
  sidebarDeleteItemBtn.appendChild(sidebarDeleteItemIcon)
  groupSidebarItem.appendChild(sidebarDeleteItemBtn)

  return groupSidebarItem
}
