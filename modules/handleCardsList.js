import { createContactItem } from './components/createContactItem'
import { createContactCard } from './components/createContactCard'
import { groupsStorage } from './handleStorage'

export const handleCardsList = () => {
  const list = document.querySelector('#accordion')

  const storage = groupsStorage.get()

  if (storage) {
    for (let group of storage) {
      const groupElement = createContactCard(group.groupName, group.id)
      const groupElementBody = groupElement.querySelector('.card-body')

      if (group.contacts.length) {
        group.contacts.forEach((contact) => {
          const contactElement = createContactItem(
            contact.initials,
            contact.number,
            contact.groupId,
            contact.id
          )

          groupElementBody.appendChild(contactElement)
        })
      }

      list.appendChild(groupElement)
    }
  }
}
