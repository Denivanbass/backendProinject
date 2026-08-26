import bcrypt from 'bcrypt';
async function CompareHash(senha, password_hash) {
    const response = await bcrypt.compare(senha, password_hash);
    return response;
}
export default CompareHash;
