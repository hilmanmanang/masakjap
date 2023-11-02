import bcrypt from 'bcryptjs'

export const toHash = async (password: string) => {
    return await bcrypt.hash(password, 10)
}