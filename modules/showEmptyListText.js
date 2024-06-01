import { groupsStorage } from './handleStorage'

export const showEmptyListText = () => {
  const emptyListTextElement = document.querySelector('.empty-list-text')

  if (groupsStorage.get().length) {
    emptyListTextElement.classList.add('display-none')
  } else {
    emptyListTextElement.classList.remove('display-none')
  }
}
