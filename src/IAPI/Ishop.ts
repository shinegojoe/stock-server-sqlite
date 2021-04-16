interface IItemBase {
  id?: number
  uid: number
  title: string
  intro: string
  imgUrl: string
  price: number
  isShopOn: boolean
  imgData: string
}

// interface IItemDB extends IItemBase {
//   id: number
// }


interface ILogoInfoBase {
  id?: number
  itemId: number
  x: number
  y: number
  w: number
  h: number
  ratio: number
  name: string
  imgData: string
  imgUrl: string
}

// interface ILogoInfoDB extends ILogoInfoBase {
//   id: number
// }

export type { IItemBase, ILogoInfoBase }