import bcrypt from 'bcryptjs'
export const toHash = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export async function compareHash(plainText: string, hashText: string) {
    return await bcrypt.compare(plainText, hashText)
}