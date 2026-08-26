import bcrypt from 'bcrypt'



async function HashPassword(senha: string) {

   return await bcrypt.hash(senha, 10)
}

export default HashPassword;




