import bcrypt from 'bcrypt'



async function CompareHash( senha: string, password_hash: string ): Promise<boolean> {

   const response = await bcrypt.compare(senha, password_hash)

   return response
   
}

export  default CompareHash;