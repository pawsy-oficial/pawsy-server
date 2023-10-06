const updateClinic = (req, res)=>{
    const { cep, city, complement, image, nameClinic, neighborhood, numberHome, numberTell, state, street, uf } = req.body

    const updatePet = `
        UPDATE clinica
        SET tl_clinica = ?, nm_clinica = ?, url_imagem = ?
        WHERE id_clinica = ?;`
    const updateAddress = `
        UPDATE endereco
        SET cd_cep = ?, nm_rua = ?, num_residencia = ?, num_residencia = ?, complemento = ?, latitude = ?, longitude = ?
        WHERE id_endereco = ?;` 
    const updateNeighborhood = `
        UPDATE bairro
        SET id_cidade = ?, nm_bairro = ?
        WHERE id_bairro = ?;`
    const updateCity = `
        UPDATE cidade
        SET id_uf = ?, nm_cidade = ?
        WHERE id_cidade = ?;`

    res.status(200).json({cep, city, complement, image, nameClinic, neighborhood, numberHome, numberTell, state, street, uf})
}

module.exports = {
    updateClinic
}