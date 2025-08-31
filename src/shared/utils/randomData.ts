import {fakerES} from "@faker-js/faker"
import type { User } from "../types/User"

export const getRandomUser = (): User => {
    
    let sex = fakerES.person.sexType();
    let firstName = fakerES.person.firstName(sex);
    console.log(`Sexo obtenido: ${sex}. Nombre obtenido: ${firstName}`)
    return {
        name: fakerES.internet.username({firstName}),
        avatar: fakerES.image.personPortrait({sex, size: 128})
    }
}