export type Project = {
    title: string,
    date: string,
    description: string,
    logo: string,
    image?: string,
    url?: string
}

export type ContactLink = {
    id: string,
    x: number,
    y: number,
    logo: string,
    unset: boolean,
    url: string,
    isFile?: boolean
}
