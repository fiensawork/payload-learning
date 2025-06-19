import { CollectionBeforeChangeHook } from 'payload'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex') // Kunci rahasia 32 bytes
const iv = crypto.randomBytes(16)
const beforeChangeProduct: CollectionBeforeChangeHook = ({ operation, data }) => {
  if (data && data.summary) {
    data.summary = encrypt(data.summary)
  }

  return data
}

function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { iv: iv.toString('hex'), encryptedData: encrypted }
}
export default beforeChangeProduct
