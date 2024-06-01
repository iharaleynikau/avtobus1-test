import arrowSvg from '../../assets/arrow.svg'

export const createContactCard = (groupName, id, hasContacts = false) => {
  const cardWrapper = document.createElement('div')
  cardWrapper.classList.add('card-wrapper')

  const card = document.createElement('div')
  card.classList.add('card')

  cardWrapper.appendChild(card)

  const cardHeader = document.createElement('div')
  cardHeader.setAttribute('data-toggle', 'collapse')
  cardHeader.setAttribute('data-target', `#${id}`)
  cardHeader.setAttribute('aria-expanded', 'true')
  cardHeader.classList.add('card-header')

  card.appendChild(cardHeader)

  const cardHeading = document.createElement('h3')
  cardHeading.classList.add('card-heading')

  cardHeading.textContent = groupName

  const cardHeaderArrow = document.createElement('img')
  cardHeaderArrow.setAttribute('src', arrowSvg)

  cardHeaderArrow.classList.add('card-arrow-rotate')

  cardHeader.appendChild(cardHeading)
  cardHeader.appendChild(cardHeaderArrow)

  const collapse = document.createElement('div')
  collapse.classList.add('collapse')
  collapse.classList.add('show')
  collapse.setAttribute('id', `${id}`)
  collapse.setAttribute('aria-labelledby', 'headingOne')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  cardBody.setAttribute('id', id)

  collapse.appendChild(cardBody)
  cardHeader.addEventListener('click', () => {
    cardHeading.classList.toggle('card-heading-unactive')
    cardHeaderArrow.classList.toggle('active-card-arrow')
  })

  card.appendChild(collapse)

  cardWrapper.appendChild(card)

  return cardWrapper
}
