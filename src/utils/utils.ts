import bcrypt from "bcryptjs"

export const toHash = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export async function compareHash(plainText: string, hashText: string) {
    return await bcrypt.compare(plainText, hashText)
}

export const generateKeyName = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, '')
}

export const convertPlaceholderName = (name: string): string => {
    const nameArray = name.toUpperCase().trim().split(" ")
    return nameArray[0] ? `${nameArray[0][0]}${nameArray.length > 1 ? nameArray[1][0] : ''}` : ''
}