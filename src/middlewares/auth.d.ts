import "jsonwebtoken";

declare module "jsonwebtoken"{
    export interface ExpressJWT{
        tutor:{
            idTutor: number
            //resto das informações que for guardar
        }
        medic:{
            idMedic: number
            //resto das informações que for guardar
        }
        clinic:{
            idClinic: number
            //resto das informações que for guardar
        }
    }
}