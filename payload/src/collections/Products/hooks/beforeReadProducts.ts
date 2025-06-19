import { CollectionBeforeReadHook } from 'payload'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex') // ✅ GUNAKAN kunci tetap dari env

const beforeReadProducts: CollectionBeforeReadHook = ({ req, doc }) => {
  if (doc && doc.summary) {
    try {
      const parse = JSON.parse(doc.summary)
      doc.summary = decrypt(parse.iv, parse.encryptedData)
    } catch (err) {
      console.error('Decrypt failed:', err)
    }
  }

  return doc
}

function decrypt(ivHex: string, encryptedData: string) {
  const ivBuffer = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export default beforeReadProducts
