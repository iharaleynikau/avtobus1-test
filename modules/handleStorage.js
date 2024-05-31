class Storage {
  constructor(groupName) {
    this.groupName = groupName

    if (!localStorage.getItem(this.groupName)) {
      localStorage.setItem(this.groupName, JSON.stringify([]))
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.groupName))
  }

  set(data) {
    return localStorage.setItem(this.groupName, JSON.stringify(data))
  }
}

export const groupsStorage = new Storage('groups')
