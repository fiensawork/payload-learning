import type { CollectionConfig } from 'payload'
import beforeValidateProducts from './hooks/beforeValidateProducts'
import beforeChangeProduct from './hooks/beforeChangeProducts'
import beforeReadProducts from './hooks/beforeReadProducts'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'text',
    },
    {
      name: 'basePrice',
      type: 'text',
      validate: (value: any) => {
        if (isNaN(Number(value))) {
          return 'Base price must be a number'
        }
        return true
      },
    },
  ],
  hooks: {
    beforeValidate: [beforeValidateProducts],
    beforeChange: [beforeChangeProduct],
    beforeRead: [beforeReadProducts],
  },
}
