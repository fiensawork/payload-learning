import { CollectionBeforeValidateHook } from 'payload'

const beforeValidateProducts: CollectionBeforeValidateHook = ({ operation, data }) => {
  if (data && data.basePrice && isNaN(Number(data.basePrice))) {
    throw new Error('Field `base price` must be number')
  }
  if (operation === 'create' && data && data.title) {
    data.title = `${data.title} - tambahan`
  } else if (operation === 'update' && data && data.title) {
    data.title = `${data.title} (edited)`
  }

  return data
}

export default beforeValidateProducts
