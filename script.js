import { main } from './modules/main'
import { handleGroupsSidebar } from './modules/handleGroupsSidebar'
import { handleContactSidebar } from './modules/handleContactSidebar'
import { handleCloseSidebars } from './modules/handleCloseSidebars'
import { handleCardsList } from './modules/handleCardsList'
import { showEmptyListText } from './modules/showEmptyListText'

main()
showEmptyListText()
handleGroupsSidebar()
handleContactSidebar()
handleCloseSidebars()
handleCardsList()
